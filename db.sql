CREATE TABLE campaign_owners (
    owner_id VARCHAR(255) PRIMARY KEY,
    owner_name TEXT NOT NULL,
    owner_email TEXT UNIQUE NOT NULL,
    password_hash TEXT,
    whatsapp_link TEXT,
    paystack_secret_key VARCHAR(255)
);

CREATE TABLE campaigns (
    campaign_id VARCHAR(255) NOT NULL PRIMARY KEY,
    owner_id VARCHAR(255) REFERENCES campaign_owners(owner_id),
    campaign_name TEXT NOT NULL,
    campaign_description TEXT,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    reward_details TEXT
);

CREATE TABLE campaign_analytics (
    campaign_id VARCHAR(255) REFERENCES campaigns(campaign_id),
    click_count INT DEFAULT 0,
    conversion_count INT DEFAULT 0,
    conversion_rate INT,
    revenue_generated INT
);

CREATE TABLE referrer (
    user_id VARCHAR(255) NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    referral_code VARCHAR(25) UNIQUE NOT NULL,
    referral_count INT DEFAULT 0,
    rewards_earned INT DEFAULT 0
);

CREATE TABLE referred (
    user_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    referrer_code VARCHAR(25) REFERENCES referrer(referral_code) UNIQUE NOT NULL
);

CREATE TABLE referrals (
    referral_id SERIAL PRIMARY KEY,
    referral_timestamp TIMESTAMP DEFAULT NOW(),
    ip_address INET,
    user_agent TEXT,
    referrer_user_id VARCHAR(255) REFERENCES referrer(user_id),  
    referred_user_id SERIAL REFERENCES referred(user_id),
    referral_code VARCHAR(25) REFERENCES referrer(referral_code),
    campaign_id VARCHAR(255) REFERENCES campaigns(campaign_id),
    reward_id VARCHAR(255) REFERENCES rewards(reward_id)
);

CREATE TABLE rewards (
    reward_id VARCHAR(255) PRIMARY KEY,
    reward_type TEXT,
    reward_value TEXT,
    expiry_date DATE,
    status VARCHAR(20)
);