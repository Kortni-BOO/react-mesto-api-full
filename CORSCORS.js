const whitelist = [
    'http://localhost:3000',
    'https://denis.antonov.frontend.nomoredomains.monster',
    'http://denis.antonov.frontend.nomoredomains.monster',
  ];
  const corsOptions = {
    origin(origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new CorsError('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    credentials: true,
  };
  app.use(cors(corsOptions));