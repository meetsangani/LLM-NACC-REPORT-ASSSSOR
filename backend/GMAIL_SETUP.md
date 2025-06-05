# Gmail SMTP Setup Instructions

## Steps to Configure Gmail for SMTP

### 1. Enable 2-Factor Authentication
1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Step Verification

### 2. Generate App Password
1. In Google Account Security settings
2. Go to "App passwords"
3. Select "Mail" and "Other (Custom name)"
4. Enter "LLM NAAC Report Assessor"
5. Copy the generated 16-character password

### 3. Update Environment Variables
```bash
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password-here
```

### 4. Alternative: Use Development Mode
For testing without email, set:
```bash
NODE_ENV=development
```

This will display the OTP in the console and response for development purposes.

## Troubleshooting
- Error 535: Use App Password, not regular password
- Error 534: Enable 2-Factor Authentication first
- Connection timeout: Check firewall/network settings
