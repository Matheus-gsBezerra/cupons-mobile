
import rateLimit from "express-rate-limit";
import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// Configuração do proxy (GitHub Codespaces)
app.set("trust proxy", 1);

// Segurança HTTP
app.use(helmet());

// CORS
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}));

// Limite de tamanho do JSON
app.use(express.json({ limit: "110kb" }));

// Rate Limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(limiter);

// Rota principal
app.get("/", (req, res) => {
    res.json({
        message: "API Cupons Mobile",
        status: "online",
        version: "1.0.0",
    });
});

// Health Check
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Servidor funcionando!",
        timestamp: new Date().toISOString(),
    });
});

// Inicialização
app.listen(PORT, "0.0.0.0", () => {
    console.log(`API executando na porta ${PORT}`);
    
    // Rota não encontrada
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Rota não encontrada",
    });
});

});
