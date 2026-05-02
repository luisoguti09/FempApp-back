const express = require('express');
const router = express.Router();
const mercadopago = require('mercadopago');          // 👈 usa el SDK v1
mercadopago.configure({ access_token: process.env.MP_ACCESS_TOKEN });

const FRONT_BASE = process.env.FRONT_BASE || 'http://localhost:4200';
const isHttps = FRONT_BASE.toLowerCase().startsWith('https://');

router.post('/crear-preferencia', async (req, res) => {
  try {
    const { title = 'Inscripción', quantity = 1, unit_price = 1 } = req.body;

    const pref = {
      items: [{
        title,
        quantity: Number(quantity),
        unit_price: Number(unit_price),
        currency_id: 'ARS',
      }],
      ...(isHttps && {
        back_urls: {
          success: `${FRONT_BASE}/pago-exitoso`,
          failure: `${FRONT_BASE}/pago-fallido`,
          pending: `${FRONT_BASE}/pago-pendiente`,
        },
        auto_return: 'approved',
      }),
      statement_descriptor: 'FEMPA',
    };

    const mpRes = await mercadopago.preferences.create(pref);
    res.json({ id: mpRes.body.id, init_point: mpRes.body.init_point });
  } catch (e) {
    console.error('[MP error]', e?.response?.body || e);
    const detail = e?.response?.body?.message || e?.message || 'unknown';
    res.status(500).json({ error: 'No se pudo crear la preferencia de pago', detail });
  }
});

module.exports = router;
