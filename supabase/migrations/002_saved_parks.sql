-- Saved parks table (user bookmarks)
CREATE TABLE saved_parks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- User identification (either session or lead)
  session_id VARCHAR(255),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,

  -- The saved park
  park_id UUID NOT NULL REFERENCES parks(id) ON DELETE CASCADE,

  -- Additional context
  saved_from_page TEXT,
  notes TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

  -- Ensure a user can't save the same park twice
  UNIQUE(session_id, park_id),
  UNIQUE(lead_id, park_id)
);

-- Indexes for performance
CREATE INDEX idx_saved_parks_session ON saved_parks(session_id);
CREATE INDEX idx_saved_parks_lead ON saved_parks(lead_id);
CREATE INDEX idx_saved_parks_park ON saved_parks(park_id);
CREATE INDEX idx_saved_parks_created ON saved_parks(created_at DESC);

-- Update trigger
CREATE TRIGGER update_saved_parks_updated_at BEFORE UPDATE ON saved_parks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions (adjust as needed for your auth setup)
-- For now, allow anonymous saves via session_id
