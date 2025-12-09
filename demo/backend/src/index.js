// backend/src/index.js
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const cache = new Map();

// helper: simulate calling multiple providers (slow I/O)
async function fetchExternalProviders(city) {
  // Simulate three providers with small differences
  await new Promise(r => setTimeout(r, 600)); // each provider simulated latency
  const base = {
    providerA: { temp: 20 + Math.floor(Math.random()*10), humidity: 50 + Math.floor(Math.random()*10) },
    providerB: { temp: 19 + Math.floor(Math.random()*12), humidity: 45 + Math.floor(Math.random()*12) },
    providerC: { temp: 21 + Math.floor(Math.random()*8), humidity: 55 + Math.floor(Math.random()*8) },
  };
  return base;
}

// heavy CPU-bound derived metric
function computeComfortScore(aggregated) {
  // do some CPU work (fake heavy): run many hash ops to simulate CPU
  let work = 0;
  for (let i=0;i<2000000;i++) {
    // tiny math to consume CPU
    work += (i * 13) % 97;
  }
  const avgTemp = (aggregated.providerA.temp + aggregated.providerB.temp + aggregated.providerC.temp)/3;
  const avgHum = (aggregated.providerA.humidity + aggregated.providerB.humidity + aggregated.providerC.humidity)/3;
  // simple derived score 0-100
  const score = Math.max(0, Math.round(100 - Math.abs(22 - avgTemp)*3 - (avgHum-50)/2));
  return { score, avgTemp, avgHum, work };
}

app.get('/api/weather', async (req, res) => {
  const city = (req.query.city || 'unknown').toLowerCase();
  const units = req.query.units || 'metric';

  // Build cache key
  const key = `weather:${city}:${units}`;

  // Check HIT
  if (cache.has(key)) {
    return res.json({
      cached: true,
      data: cache.get(key)
    });
  }

  // MISS → Generate fresh response
  const aggregated = await fetchExternalProviders(city);
  const analysis = computeComfortScore(aggregated);

  const response = {
    city,
    units,
    timestamp: Date.now(),
    providers: aggregated,
    analysis
  };

  // Store in cache
  cache.set(key, response);

  res.json({
    cached: false,
    data: response
  });
});


// intentionally slower endpoint for demo caching
app.get('/api/slow', async (req, res) => {
  const city = (req.query.city || 'unknown').toLowerCase();
  const key = `slow:${city}`;

  if (cache.has(key)) {
    return res.json({
      cached: true,
      data: cache.get(key)
    });
  }

  // Slow, CPU-heavy processing
  await new Promise(r => setTimeout(r, 1000));
  const aggregated = await fetchExternalProviders(city);
  const analysis = computeComfortScore(aggregated);

  const response = {
    city,
    timestamp: Date.now(),
    providers: aggregated,
    analysis
  };

  cache.set(key, response);

  res.json({
    cached: false,
    data: response
  });
});


app.get('/api/status', async (req,res) => {
  // simple status: process uptime + pid (frontend can poll)
  res.json({ uptime: process.uptime(), pid: process.pid, env: process.env.NODE_ENV || 'dev' });
});

// endpoint to trigger short CPU work to force HPA scaling (optional)
app.post('/api/generate-load', async (req,res) => {
  const duration = Number(req.body.seconds) || 20;
  const end = Date.now() + duration*1000;
  // synchronous busy loop for duration milliseconds — careful (use small duration)
  function busy(ms) {
    const stop = Date.now() + ms;
    while (Date.now() < stop) {
      // busy math
      Math.sqrt(Math.random()*Math.random()*Date.now());
    }
  }
  // run small busy loops asynchronously so request returns quickly
  setImmediate(() => {
    while (Date.now() < end) busy(200);
  });
  res.json({ status: 'load started', duration });
});

app.get('/healthz', (req,res) => res.send('ok'));

app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
