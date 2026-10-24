export function health(req, res) { res.json({ status: 'ok', time: new Date().toISOString() }); }
