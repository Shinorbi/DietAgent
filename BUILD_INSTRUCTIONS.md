# DietAgent Build & Test Instructions

## Backend Setup (Run First)

### 1. Start the Backend Server

```bash
cd diet_ai_agent

# Install dependencies (if not already done)
pip install -r requirements.txt

# Option 1: Start the server (simple)
python -m app.main

# Option 2: Start with multiple workers (recommended for production)
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

The server will run on `http://0.0.0.0:8000`

**Note:** Using `--workers 4` allows the server to handle multiple requests concurrently. This is recommended when testing with the mobile app.

### 2. Find Your Computer's IP Address

**On macOS/Linux:**
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

**On Windows:**
```bash
ipconfig
```

Look for your local IP address (e.g., `192.168.0.105`)

### 3. Update Frontend API URL

Edit `DietAgent/.env` and update the API_BASE_URL:

```
API_BASE_URL=http://YOUR_IP_ADDRESS:8000
```

Replace `YOUR_IP_ADDRESS` with your actual IP address.

---

## Building APK with EAS Build

### Prerequisites

1. Install EAS CLI:
```bash
npm install -g eas-cli
```

2. Create an Expo account at https://expo.dev

3. Login to EAS:
```bash
eas login
```

### Build APK

1. Navigate to the DietAgent directory:
```bash
cd DietAgent
```

2. Configure EAS (first time only):
```bash
eas build:configure
```

3. Build APK for testing:
```bash
eas build --platform android --profile preview
```

4. Wait for the build to complete (usually 5-15 minutes)

5. Download the APK from the link provided or from https://expo.dev

### Install APK on Android Device

1. Enable "Install from Unknown Sources" in your Android settings
2. Transfer the APK to your phone
3. Open the APK file to install

---

## Testing the App

### 1. Ensure Backend is Running

Make sure your backend server is running and accessible from your phone.

**Important:** Your phone must be on the same WiFi network as your computer.

### 2. Update API URL for Phone Access

If testing on a real device, make sure the `API_BASE_URL` in `.env` points to your computer's local IP address (not localhost).

### 3. Test API Connection

Open a browser on your phone and navigate to:
```
http://YOUR_IP_ADDRESS:8000/health
```

You should see: `{"status":"healthy","message":"Diet AI Agent is running"}`

### 4. Test the App

1. Open the DietAgent app on your phone
2. Try generating a diet plan
3. The app should now:
   - Retry failed requests automatically
   - Handle timeouts gracefully
   - Work even if minimized (will resume when reopened)

---

## Troubleshooting

### "Network Request Failed"

1. Check if backend is running
2. Verify your phone is on the same WiFi network
3. Check the IP address in `.env` is correct
4. Test the health endpoint in your phone's browser

### "Request Timeout"

1. The LLM API might be slow - wait a bit longer
2. Check your internet connection
3. Verify your OpenRouter API key is valid

### Build Fails

1. Make sure you're logged in to EAS: `eas login`
2. Check your Expo account has build credits
3. Try clearing cache: `eas build --clear-cache`

### App Crashes on Phone

1. Check the logs in Expo dashboard
2. Make sure all dependencies are installed: `npm install`
3. Try rebuilding the APK

---

## Performance Improvements Made

### Backend
- ✅ Multiple workers (4) for concurrent request handling
- ✅ Async thread pool for LLM calls
- ✅ Faster LLM model (Google Gemma 2 9B)
- ✅ Shorter prompts for faster response

### Frontend
- ✅ Request timeout handling (90s for diet plans)
- ✅ Automatic retry with exponential backoff
- ✅ Better error messages

### Expected Response Times
- Diet Plan Generation: 10-30 seconds (was 30-60+ seconds)
- Meal Analysis: 5-15 seconds
- Food Recommendations: 5-15 seconds

---

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/api/user/diet-plan` | POST | Generate diet plan |
| `/api/meal/analyze` | POST | Analyze a meal |
| `/api/ask` | POST | Ask AI for recommendations |

---

## Environment Variables

### Backend (.env in diet_ai_agent/)
```
OPENROUTER_API_KEY=your_api_key_here
```

### Frontend (.env in DietAgent/)
```
API_BASE_URL=http://192.168.0.105:8000