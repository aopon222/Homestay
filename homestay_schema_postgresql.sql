-- ============================================================
--  Homestay 18 Kamar — Database Schema (PostgreSQL)
--  SistemBeres
-- ============================================================

-- ============================================================
-- 1. USERS (Resepsionis & Owner)
-- ============================================================
CREATE TABLE users (
    id_user       SERIAL PRIMARY KEY,
    nama          VARCHAR(100) NOT NULL,
    email         VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role          VARCHAR(20)  NOT NULL DEFAULT 'resepsionis'
                  CHECK (role IN ('owner', 'resepsionis')),
    created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- 2. KAMAR
-- ============================================================
CREATE TABLE kamar (
    id_kamar        SERIAL PRIMARY KEY,
    nomor_kamar     VARCHAR(10)    NOT NULL UNIQUE,
    tipe_kamar      VARCHAR(50)    NOT NULL,
    harga_per_malam NUMERIC(12,2)  NOT NULL,
    status          VARCHAR(20)    NOT NULL DEFAULT 'kosong'
                    CHECK (status IN ('kosong', 'terisi', 'dibersihkan')),
    keterangan      TEXT
);

-- ============================================================
-- 3. TAMU
-- ============================================================
CREATE TABLE tamu (
    id_tamu    SERIAL PRIMARY KEY,
    nama       VARCHAR(100) NOT NULL,
    no_hp      VARCHAR(20)  NOT NULL,
    email      VARCHAR(100),
    no_ktp     VARCHAR(20),
    alamat     TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- 4. RESERVASI
-- ============================================================
CREATE TABLE reservasi (
    id_reservasi     SERIAL PRIMARY KEY,
    id_tamu          INT NOT NULL REFERENCES tamu(id_tamu),
    id_kamar         INT NOT NULL REFERENCES kamar(id_kamar),
    id_user          INT NOT NULL REFERENCES users(id_user),
    tanggal_masuk    DATE          NOT NULL,
    tanggal_keluar   DATE          NOT NULL,
    jumlah_malam     INT GENERATED ALWAYS AS
                       (tanggal_keluar - tanggal_masuk) STORED,
    total_harga      NUMERIC(12,2) NOT NULL,
    sumber_booking   VARCHAR(20)   NOT NULL
                     CHECK (sumber_booking IN ('whatsapp', 'walk_in', 'ota')),
    status_reservasi VARCHAR(20)   NOT NULL DEFAULT 'pending'
                     CHECK (status_reservasi IN ('pending','konfirmasi','checkin','checkout','batal')),
    catatan          TEXT,
    created_at       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_tanggal CHECK (tanggal_keluar > tanggal_masuk)
);

-- ============================================================
-- 5. PEMBAYARAN
-- ============================================================
CREATE TABLE pembayaran (
    id_pembayaran SERIAL PRIMARY KEY,
    id_reservasi  INT NOT NULL REFERENCES reservasi(id_reservasi),
    tipe          VARCHAR(20)   NOT NULL
                  CHECK (tipe IN ('dp', 'pelunasan')),
    jumlah        NUMERIC(12,2) NOT NULL,
    metode        VARCHAR(20)   NOT NULL DEFAULT 'tunai'
                  CHECK (metode IN ('tunai', 'transfer', 'qris', 'ota')),
    status_bayar  VARCHAR(20)   NOT NULL DEFAULT 'pending'
                  CHECK (status_bayar IN ('pending', 'lunas')),
    bukti_bayar   VARCHAR(255),
    waktu_bayar   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    dicatat_oleh  INT NOT NULL REFERENCES users(id_user)
);

-- ============================================================
-- 6. CHECKIN_OUT
-- ============================================================
CREATE TABLE checkin_out (
    id_checkinout  SERIAL PRIMARY KEY,
    id_reservasi   INT NOT NULL UNIQUE REFERENCES reservasi(id_reservasi),
    waktu_checkin  TIMESTAMP,
    waktu_checkout TIMESTAMP,
    catatan        TEXT,
    dicatat_oleh   INT NOT NULL REFERENCES users(id_user)
);

-- ============================================================
-- 7. LAPORAN
-- ============================================================
CREATE TABLE laporan (
    id_laporan          SERIAL PRIMARY KEY,
    tanggal             DATE        NOT NULL,
    periode             VARCHAR(10) NOT NULL DEFAULT 'harian'
                        CHECK (periode IN ('harian', 'bulanan')),
    sumber_booking      VARCHAR(20) NOT NULL DEFAULT 'semua'
                        CHECK (sumber_booking IN ('whatsapp', 'walk_in', 'ota', 'semua')),
    total_pendapatan    NUMERIC(14,2) NOT NULL DEFAULT 0,
    jumlah_reservasi    INT           NOT NULL DEFAULT 0,
    jumlah_kamar_terisi INT           NOT NULL DEFAULT 0,
    dibuat_pada         TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    dibuat_oleh         INT           NOT NULL REFERENCES users(id_user),

    CONSTRAINT uq_laporan UNIQUE (tanggal, periode, sumber_booking)
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX idx_reservasi_tanggal    ON reservasi(tanggal_masuk, tanggal_keluar);
CREATE INDEX idx_reservasi_status     ON reservasi(status_reservasi);
CREATE INDEX idx_reservasi_kamar      ON reservasi(id_kamar);
CREATE INDEX idx_pembayaran_reservasi ON pembayaran(id_reservasi);
CREATE INDEX idx_kamar_status         ON kamar(status);
CREATE INDEX idx_laporan_tanggal      ON laporan(tanggal, periode);

-- ============================================================
-- SEED DATA — 18 kamar
-- ============================================================
INSERT INTO kamar (nomor_kamar, tipe_kamar, harga_per_malam, status) VALUES
('101', 'Standard', 250000, 'kosong'),
('102', 'Standard', 250000, 'kosong'),
('103', 'Standard', 250000, 'kosong'),
('104', 'Standard', 250000, 'kosong'),
('105', 'Standard', 250000, 'kosong'),
('106', 'Standard', 250000, 'kosong'),
('201', 'Deluxe',   350000, 'kosong'),
('202', 'Deluxe',   350000, 'kosong'),
('203', 'Deluxe',   350000, 'kosong'),
('204', 'Deluxe',   350000, 'kosong'),
('205', 'Deluxe',   350000, 'kosong'),
('206', 'Deluxe',   350000, 'kosong'),
('301', 'Suite',    500000, 'kosong'),
('302', 'Suite',    500000, 'kosong'),
('303', 'Suite',    500000, 'kosong'),
('304', 'Suite',    500000, 'kosong'),
('305', 'Suite',    500000, 'kosong'),
('306', 'Suite',    500000, 'kosong');

-- ============================================================
-- SEED DATA — user default
-- ============================================================
-- Ganti password_hash dengan hash bcrypt sebelum production
INSERT INTO users (nama, email, password_hash, role) VALUES
('Owner Homestay', 'owner@homestay.com',  '$2b$12$placeholder_owner_hash',  'owner'),
('Resepsionis 1',  'resep1@homestay.com', '$2b$12$placeholder_resep1_hash', 'resepsionis');

