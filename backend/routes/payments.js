import express from 'express';
import Stripe from 'stripe';
import { authMiddleware } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

const PRODUCTS = {
  life_1:          { name: '+1 Vida',         price: 99,   currency: 'usd', mode: 'payment',      type: 'consumable' },
  life_full:       { name: 'Vidas Completas',  price: 199,  currency: 'usd', mode: 'payment',      type: 'consumable' },
  premium_monthly: { name: 'Premium Mensual',  price: 299,  currency: 'usd', mode: 'subscription', interval: 'month' },
  premium_yearly:  { name: 'Premium Anual',    price: 1999, currency: 'usd', mode: 'subscription', interval: 'year' },
  remove_ads:      { name: 'Quitar Anuncios',  price: 599,  currency: 'usd', mode: 'payment',      type: 'non-consumable' },
  coins_500:       { name: '500 Monedas',      price: 99,   currency: 'usd', mode: 'payment',      coins: 500 },
  coins_1500:      { name: '1,500 Monedas',    price: 249,  currency: 'usd', mode: 'payment',      coins: 1650 },
  coins_5000:      { name: '5,000 Monedas',    price: 699,  currency: 'usd', mode: 'payment',      coins: 6250 },
  coins_12000:     { name: '12,000 Monedas',   price: 1499, currency: 'usd', mode: 'payment',      coins: 16800 },
};

const APP_URL = process.env.APP_URL || 'https://proyecto-biblia-pi.vercel.app';

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

// POST /api/payments/create-checkout-session
router.post('/create-checkout-session', authMiddleware, async (req, res) => {
  try {
    const { productId } = req.body;
    const product = PRODUCTS[productId];
    if (!product) return res.status(400).json({ error: 'Producto no encontrado' });
    if (!req.user) return res.status(401).json({ error: 'Debes iniciar sesión para comprar' });

    const stripe = getStripe();
    const uid = req.user.uid;
    const successUrl = `${APP_URL}/?payment=success&session_id={CHECKOUT_SESSION_ID}&productId=${productId}`;
    const cancelUrl = `${APP_URL}/?payment=cancelled`;

    let sessionConfig = {
      metadata: { uid, productId },
      success_url: successUrl,
      cancel_url: cancelUrl,
    };

    if (product.mode === 'subscription') {
      sessionConfig.mode = 'subscription';
      sessionConfig.line_items = [{
        price_data: {
          currency: product.currency,
          product_data: { name: product.name },
          recurring: { interval: product.interval },
          unit_amount: product.price,
        },
        quantity: 1,
      }];
      sessionConfig.subscription_data = { metadata: { uid, productId } };
    } else {
      sessionConfig.mode = 'payment';
      sessionConfig.line_items = [{
        price_data: {
          currency: product.currency,
          product_data: { name: product.name },
          unit_amount: product.price,
        },
        quantity: 1,
      }];
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);
    res.json({ url: session.url });
  } catch (err) {
    console.error('[Payments] Error creating session:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/payments/verify-session
router.get('/verify-session', authMiddleware, async (req, res) => {
  try {
    const { session_id, productId } = req.query;
    if (!session_id || !productId) return res.status(400).json({ error: 'Parámetros faltantes' });
    if (!req.user) return res.status(401).json({ error: 'No autenticado' });

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== 'paid' && session.status !== 'complete') {
      return res.status(400).json({ error: 'Pago no completado' });
    }
    if (session.metadata.uid !== req.user.uid) {
      return res.status(403).json({ error: 'Sesión no válida para este usuario' });
    }

    await applyPurchase(req.user.uid, productId);
    res.json({ success: true, productId });
  } catch (err) {
    console.error('[Payments] Error verifying session:', err);
    res.status(500).json({ error: err.message });
  }
});

// Stripe webhook handler (exported for raw body registration in server.js)
export async function handleStripeWebhook(req, res) {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.warn('[Payments] STRIPE_WEBHOOK_SECRET not set — skipping signature check');
    return res.json({ received: true });
  }

  let event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('[Payments] Webhook signature failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const { uid, productId } = session.metadata || {};
      if (uid && productId) await applyPurchase(uid, productId);
    }

    if (event.type === 'customer.subscription.deleted') {
      const sub = event.data.object;
      const uid = sub.metadata?.uid;
      if (uid) {
        await User.updateOne({ uid }, { $set: { isPremium: false, premiumExpiry: null } });
      }
    }
  } catch (err) {
    console.error('[Payments] Error processing webhook event:', err);
  }

  res.json({ received: true });
}

async function applyPurchase(uid, productId) {
  const product = PRODUCTS[productId];
  if (!product) return;

  switch (productId) {
    case 'premium_monthly': {
      const expiry = new Date();
      expiry.setMonth(expiry.getMonth() + 1);
      await User.updateOne({ uid }, { $set: { isPremium: true, adsRemoved: true, premiumExpiry: expiry } });
      break;
    }
    case 'premium_yearly': {
      const expiry = new Date();
      expiry.setFullYear(expiry.getFullYear() + 1);
      await User.updateOne({ uid }, { $set: { isPremium: true, adsRemoved: true, premiumExpiry: expiry } });
      break;
    }
    case 'remove_ads':
      await User.updateOne({ uid }, { $set: { adsRemoved: true } });
      break;
    default:
      if (product.coins) {
        await User.updateOne({ uid }, { $inc: { coins: product.coins } });
      }
  }

  console.log(`[Payments] Applied purchase: ${productId} for uid ${uid}`);
}

export default router;
