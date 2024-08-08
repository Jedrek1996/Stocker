# Live Demo

You can view a live demo of the application [here](https://stocker-alpha.vercel.app).

# Stocker💹

Stocker is an all-in-one platform designed to help users track their stock investments in real time. This work-in-progress project offers a comprehensive suite of features, including profit/loss analysis, currency conversion, and personalized suggestions. Whether you're a seasoned investor or just starting, Stocker provides the tools you need to manage and optimize your portfolio.

## Features ✨

- **Real-Time Stock Tracking**: Monitor your stock investments with up-to-the-minute updates. Stocker allows you to input and track various stock positions, ensuring you always have the latest information at your fingertips.

- **Profit/Loss Calculation**: Easily calculate your profits or losses based on your initial investment value. Stocker provides clear insights into how your investments are performing, helping you make informed decisions.

- **Currency Converter**: Convert your stock values between different currencies with ease. This feature ensures that you can view your investments in your preferred currency, making it simpler to manage international investments.

- **OpenAI-Powered Suggestions**: Leverage the power of OpenAI to receive personalized investment suggestions and insights. Stocker analyzes market trends and provides recommendations tailored to your portfolio.

- **User Dashboard**: Access a comprehensive dashboard to view your overall portfolio performance. The dashboard provides a clear overview of your investments, including metrics like total value, gains, and losses.

- **Secure Profile Management**: Sign up and manage your profile securely with Clerk authentication. Stocker ensures that your personal information and investment data are protected.

## Tech Stack 🛠️

- **Frontend**: Next.js (React)
- **Styling**: DaisyUI, Tailwind, Toast, Lottie (Chart.js - TBD)
- **Authentication**: Clerk
- **AI Integration**: OpenAI

## Future Plans 🚀

- **Real-Time Stock Tracker**: Enhance the real-time stock tracking feature to include more detailed market data, alerts, and notifications.

- **Currency Converter Expansion**: Expand the currency converter feature to support more currencies and provide historical exchange rate data.

- **Test Cases**: Comprehensive test cases will be implemented to ensure the reliability and accuracy of Stocker's features.

# Limitations

- **Batch/ Cron Job Schelduer**: Due to using free tiers of various services, not all functionalities may perform optimally. Specifically, the cron job designed to save user data will only execute once daily at 23:59. This means that user asset data is recorded at the end of each day.

- **Stock API provided by FinnHub & Polygon.ai**: The APIs provided by FinnHub and Polygon.ai might have restrictions or limitations in their free tiers, potentially affecting the frequency and depth of data retrieval.
