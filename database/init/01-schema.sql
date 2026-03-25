-- Asesoría Legal - Database Schema

USE asesoria_legal;

-- Contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    servicio VARCHAR(50),
    mensaje TEXT,
    status ENUM('pending', 'contacted', 'resolved') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- WhatsApp messages log (optional)
CREATE TABLE IF NOT EXISTS whatsapp_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    phone VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    direction ENUM('incoming', 'outgoing') NOT NULL,
    status ENUM('sent', 'delivered', 'read', 'failed') DEFAULT 'sent',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_phone (phone),
    INDEX idx_direction (direction),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Services table (for dynamic services management)
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default services
INSERT INTO services (title, description, icon, sort_order) VALUES
('Derecho de Familia', 'Divorcios, pensiones alimenticias, cuidado personal de hijos, régimen de visitas y liquidación de bienes.', 'family', 1),
('Contratos y Documentos', 'Redacción y revisión de contratos civiles, comerciales, laborales y todo tipo de documentos legales.', 'document', 2),
('Asesoría Preventiva', 'Orientación legal para prevenir conflictos y tomar decisiones informadas en tu vida personal y profesional.', 'shield', 3),
('Derecho Inmobiliario', 'Compraventa de propiedades, arriendos, promesas, estudios de títulos y regularización de bienes raíces.', 'building', 4),
('Derecho Laboral', 'Finiquitos, despidos, demandas laborales, contratos de trabajo y asesoría en relaciones empleador-trabajador.', 'briefcase', 5),
('Herencias y Sucesiones', 'Posesiones efectivas, testamentos, partición de bienes y todo lo relacionado con derecho sucesorio.', 'book', 6);
