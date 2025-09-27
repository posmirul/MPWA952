# MPWA 9.5.2 - Extended WhatsApp Web Application

## Overview

This is an extended Laravel-based web application for managing WhatsApp communications. It supports multi-device WhatsApp integration, allowing users to send messages, manage campaigns, handle autoreplies, organize contacts, and track message history. Built with Laravel framework, it includes admin panels, API endpoints, and frontend assets for a complete messaging platform.

Key technologies:

- Backend: Laravel (PHP)
- Frontend: Bootstrap, jQuery, Vue.js (partial)
- Database: MySQL (via Laravel migrations)
- Additional: Laravel File Manager, Localization, Sanctum for API auth

## Features

- **Device Management**: Connect and manage multiple WhatsApp devices via API.
- **Message Sending**: Send individual or bulk messages, including campaigns and blasts.
- **Autoreplies**: Set up automated responses based on tags and conditions.
- **Contacts & Phonebook**: Import, manage, and tag contacts.
- **Campaigns & Blasts**: Schedule and execute messaging campaigns.
- **Message History**: View and search past messages.
- **Admin Dashboard**: User authentication, license verification, and system settings.
- **API Support**: RESTful APIs for devices, messages, and more.
- **File Management**: Upload and organize files via Laravel File Manager.
- **Notifications & UI**: Integrated notifications, charts (ApexCharts, Chart.js), and responsive design.

## Prerequisites

- PHP >= 8.0
- Composer
- Node.js and NPM
- MySQL or compatible database
- Git

## Installation

1. **Clone the Repository**:

   ```
   git clone https://github.com/posmirul/MPWA952.git
   cd MPWA952
   ```

2. **Install PHP Dependencies**:

   ```
   composer install --optimize-autoloader --no-dev
   ```

3. **Install Node Dependencies**:

   ```
   npm install
   ```

4. **Environment Setup**:
   Copy the example environment file and configure it:

   ```
   cp .env.example .env
   ```

   Edit `.env` with your database credentials, app keys, and WhatsApp API settings (e.g., device tokens).

5. **Generate Application Key**:

   ```
   php artisan key:generate
   ```

6. **Database Setup**:
   Run migrations and seeders:

   ```
   php artisan migrate
   php artisan db:seed
   ```

7. **Build Assets**:
   Compile frontend assets:

   ```
   npm run dev
   # or for production: npm run build
   ```

8. **Permissions**:
   Set storage and bootstrap cache permissions:

   ```
   chmod -R 775 storage bootstrap/cache
   ```

9. **Start the Server**:
   ```
   php artisan serve
   ```
   Access the application at `http://localhost:8000`.

## Usage

- **Login**: Use default admin credentials (check seeders or create via `php artisan tinker`).
- **Dashboard**: Navigate to manage devices, send messages, set up autoreplies, etc.
- **API Usage**: Authenticate with Sanctum tokens. Endpoints include `/api/devices`, `/api/messages`.
- **WhatsApp Integration**: Configure devices in the admin panel; requires a WhatsApp Web session or compatible API.

For detailed API documentation, refer to the controllers in `app/Http/Controllers/Api/`.

## Configuration

- **Database**: Update `config/database.php` if needed.
- **Mail & Queue**: Configure in `.env` for email notifications and job processing.
- **File Manager**: Settings in `config/lfm.php`.
- **Localization**: Supports multiple languages via `config/laravellocalization.php`.

## Troubleshooting

- **Migration Errors**: Ensure database connection in `.env`.
- **Asset Issues**: Run `npm run build` after changes.
- **Device Connection**: Verify WhatsApp API keys and network access.
- **License Verification**: Check `app/Http/Middleware/isVerifiedLicense.php` for custom logic.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details. Note: WhatsApp integration may require compliance with Meta's terms.

## Support

For issues, open a GitHub issue. For custom features, contact the maintainer.

---

_Project extended from base Laravel setup for WhatsApp multi-platform automation._
