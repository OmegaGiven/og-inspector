// Small built-in datasets for the "Try a sample" links on the empty
// screen — one per supported input, so every mode has something to show.

export const SAMPLES = {
  json: {
    short: 'JSON API response',
    label: 'sample-orders.json',
    format: 'json',
    text: JSON.stringify({
      status: 'ok',
      page: { number: 1, size: 4, total: 4 },
      data: [
        { id: 1001, customer: { name: 'Ava Ng', city: 'Denver' }, total: 129.5, paid: true, items: ['keyboard', 'cable'], placed_at: '2026-03-02T14:21:00Z' },
        { id: 1002, customer: { name: 'Liam Patel', city: 'Austin' }, total: 42.0, paid: false, items: ['mouse'], placed_at: '2026-03-03T09:05:00Z' },
        { id: 1003, customer: { name: 'Mia Reyes', city: 'Seattle' }, total: 389.99, paid: true, items: ['monitor'], placed_at: '2026-03-04T18:47:00Z' },
        { id: 1004, customer: { name: 'Noah Kim', city: 'Chicago' }, total: 74.25, paid: true, items: ['headset', 'cable', 'mouse'], placed_at: '2026-03-05T11:30:00Z', notes: null }
      ]
    })
  },
  csv: {
    short: 'CSV sales',
    label: 'sample-sales.csv',
    format: 'csv',
    mode: 'table',
    text: `month,region,revenue,orders,returns
2026-01,North,18250.5,412,9
2026-02,North,19870,438,12
2026-03,North,22410.75,501,7
2026-04,North,21005,466,11
2026-05,North,24890.2,540,6
2026-06,North,26730,577,10
`
  },
  ndjson: {
    short: 'NDJSON logs',
    label: 'sample-logs.ndjson',
    format: 'ndjson',
    mode: 'table',
    text: `{"ts":"2026-03-05T11:30:01Z","level":"info","msg":"request","method":"GET","path":"/api/orders","status":200,"ms":38}
{"ts":"2026-03-05T11:30:02Z","level":"info","msg":"request","method":"POST","path":"/api/orders","status":201,"ms":112}
{"ts":"2026-03-05T11:30:04Z","level":"warn","msg":"slow query","method":"GET","path":"/api/reports","status":200,"ms":1840}
{"ts":"2026-03-05T11:30:07Z","level":"error","msg":"upstream timeout","method":"GET","path":"/api/rates","status":504,"ms":5000}
{"ts":"2026-03-05T11:30:09Z","level":"info","msg":"request","method":"DELETE","path":"/api/orders/1002","status":204,"ms":21}
`
  },
  jwt: {
    short: 'JWT',
    label: 'Decoded JWT',
    text: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyXzE4NDIiLCJuYW1lIjoiQWRhIExvdmVsYWNlIiwiZW1haWwiOiJhZGFAZXhhbXBsZS5jb20iLCJyb2xlcyI6WyJhZG1pbiIsImVkaXRvciJdLCJpc3MiOiJodHRwczovL2F1dGguZXhhbXBsZS5jb20iLCJhdWQiOiJvZy1pbnNwZWN0b3ItZGVtbyIsImlhdCI6MTc2NzIyNTYwMCwibmJmIjoxNzY3MjI1NjAwLCJleHAiOjE3NjczMTIwMDB9.c2lnbmF0dXJlLW5vdC12ZXJpZmllZA'
  }
};
