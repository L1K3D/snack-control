const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/database');

const StudentRoutes = require('./routes/StudentRoutes');
const AuthorizationRoutes = require('./routes/AuthorizationRoutes');
const DeliveryRoutes = require('./routes/DeliveryRoutes');

require('dotenv').config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));

// Rotas
app.use('/api/students', StudentRoutes);
app.use('/api/authorizations', AuthorizationRoutes);
app.use('/api/deliveries', DeliveryRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));