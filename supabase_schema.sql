-- Run this in your Supabase SQL Editor to create the necessary tables

-- Drop tables if they exist to start fresh
DROP TABLE IF EXISTS packages;
DROP TABLE IF EXISTS hotels;
DROP TABLE IF EXISTS famous_places;
DROP TABLE IF EXISTS districts;
DROP TABLE IF EXISTS provinces;
CREATE TABLE provinces (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE districts (
    id TEXT PRIMARY KEY,
    province_id TEXT NOT NULL REFERENCES provinces(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE famous_places (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    province_id TEXT NOT NULL,
    district_id TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Note: To allow anonymous reads from your website, you can enable Row Level Security (RLS) and add select policies:
ALTER TABLE provinces ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-only access." ON provinces FOR SELECT USING (true);

ALTER TABLE districts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-only access." ON districts FOR SELECT USING (true);

ALTER TABLE famous_places ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-only access." ON famous_places FOR SELECT USING (true);

CREATE TABLE packages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    duration TEXT NOT NULL,
    price TEXT NOT NULL,
    image TEXT,
    tag TEXT NOT NULL,
    color TEXT NOT NULL,
    features TEXT[] NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-only access." ON packages FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert." ON packages FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update." ON packages FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete." ON packages FOR DELETE TO authenticated USING (true);

CREATE TABLE hotels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    image TEXT,
    tag TEXT NOT NULL,
    rating TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE hotels ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-only access." ON hotels FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert." ON hotels FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update." ON hotels FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete." ON hotels FOR DELETE TO authenticated USING (true);

-- Adding insert/update/delete policies for destination tables for the admin dashboard
CREATE POLICY "Allow authenticated insert." ON provinces FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update." ON provinces FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete." ON provinces FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated insert." ON districts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update." ON districts FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete." ON districts FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated insert." ON famous_places FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update." ON famous_places FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete." ON famous_places FOR DELETE TO authenticated USING (true);

-- Gallery Table
CREATE TABLE gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    country TEXT NOT NULL,
    image TEXT,
    link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-only access." ON gallery FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert." ON gallery FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update." ON gallery FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete." ON gallery FOR DELETE TO authenticated USING (true);

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    message TEXT NOT NULL,
    images TEXT[] DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'approved'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Allow public to submit reviews (so users can leave reviews)
CREATE POLICY "Allow public insert" ON reviews FOR INSERT WITH CHECK (true);

-- Allow public to read ONLY approved reviews
CREATE POLICY "Allow public read approved" ON reviews FOR SELECT USING (status = 'approved');

-- Allow ONLY authenticated admins to update (e.g. approve) or delete reviews
CREATE POLICY "Allow authenticated update" ON reviews FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete" ON reviews FOR DELETE TO authenticated USING (true);

-- Note: Admin authentication is handled via Supabase Auth (Authentication > Users).
-- To create an admin, add a user in the Supabase Dashboard.

-- Activities Table
CREATE TABLE IF NOT EXISTS activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    season TEXT NOT NULL,
    level TEXT NOT NULL,
    location TEXT NOT NULL,
    image TEXT,
    color TEXT NOT NULL,
    tag TEXT NOT NULL,
    description TEXT NOT NULL,
    features TEXT[] NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-only access." ON activities FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert." ON activities FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update." ON activities FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete." ON activities FOR DELETE TO authenticated USING (true);

-- Alter Packages Table for Seasonal Special Offers
ALTER TABLE packages ADD COLUMN IF NOT EXISTS is_special_offer BOOLEAN DEFAULT FALSE;
ALTER TABLE packages ADD COLUMN IF NOT EXISTS days INTEGER;
ALTER TABLE packages ADD COLUMN IF NOT EXISTS nights INTEGER;
ALTER TABLE packages ADD COLUMN IF NOT EXISTS offer_percentage INTEGER;
ALTER TABLE packages ADD COLUMN IF NOT EXISTS actual_price NUMERIC;


