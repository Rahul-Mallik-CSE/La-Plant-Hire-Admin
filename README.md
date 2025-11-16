<!-- @format -->

# LA Plant Hire Admin Dashboard

A modern, responsive admin dashboard for managing plant hire equipment enquiries and orders. Built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

- **📊 Dashboard Overview**: View and manage equipment hire enquiries in real-time
- **📋 Enquiry Management**: Track pending, confirmed, and cancelled orders
- **🔍 Advanced Filtering**: Separate views for different enquiry statuses
- **📱 Responsive Design**: Fully responsive UI that works on all devices
- **🎨 Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **📄 Pagination**: Handle large datasets with 15 items per page
- **🔔 Modal Dialogs**: View detailed enquiry information in beautiful modals
- **🔐 Authentication Ready**: Logout functionality with confirmation modal
- **⚡ Real-time Updates**: Status changes reflect immediately across the app

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **State Management**: React Hooks (useState, useMemo)
- **Font**: Geist Sans & Geist Mono

## 📦 Installation

1. **Clone the repository**

```bash
git clone https://github.com/Rahul-Mallik-CSE/La-Plant-Hire-Admin.git
cd la-plant-hire-admin
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
la-plant-hire-admin/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── page.tsx                  # Home - Pending enquiries
│   │   ├── confirmed-orders/         # Confirmed orders page
│   │   ├── cancelled-orders/         # Cancelled orders page
│   │   ├── layout.tsx                # Root layout with sidebar
│   │   └── globals.css               # Global styles
│   ├── components/
│   │   ├── CommonComponents/
│   │   │   ├── CommonTable.tsx       # Reusable table with pagination
│   │   │   ├── DashboardSidebar.tsx  # Navigation sidebar
│   │   │   ├── EnquiryModal.tsx      # Enquiry details modal
│   │   │   ├── LogOutModal.tsx       # Logout confirmation modal
│   │   │   └── NavBar.tsx            # Top navigation bar
│   │   └── ui/                       # shadcn/ui components
│   ├── data/
│   │   └── AllData.tsx               # Mock enquiry data (30 records)
│   ├── types/
│   │   └── AllTypes.tsx              # TypeScript type definitions
│   ├── hooks/
│   │   └── use-mobile.ts             # Mobile detection hook
│   └── lib/
│       └── utils.ts                  # Utility functions
├── public/
│   └── logo/                         # Logo assets
├── components.json                   # shadcn/ui configuration
├── tailwind.config.ts                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
└── package.json                      # Project dependencies
```

## 🎯 Key Features Explained

### Enquiry Management System

The application manages three types of enquiry statuses:

1. **Pending** (`/`): New enquiries awaiting action
2. **Confirmed** (`/confirmed-orders`): Accepted equipment hire requests
3. **Cancelled** (`/cancelled-orders`): Rejected or cancelled requests

### Data Structure

Each enquiry contains:

- Customer information (name, phone, email)
- Equipment type (Bulldozer, Excavator, Crane, etc.)
- Duration of hire
- Detailed description
- Status (pending/accepted/rejected)
- Creation date

### Modal Actions

The enquiry modal provides different actions based on status:

- **Pending**: Confirm Order | Cancel Order
- **Accepted**: Cancel Order | Go Back
- **Rejected**: Go Back

Status changes update in real-time and reflect across all pages.

## 🎨 UI Components

Built with shadcn/ui components:

- `Table` - Data display with custom styling
- `Pagination` - Page navigation with ellipsis
- `Dialog` - Modal windows for enquiry details
- `Button` - Various button styles
- `Input` - Search and form inputs
- `Sidebar` - Collapsible navigation sidebar

## 📱 Responsive Design

- **Mobile**: Hamburger menu, optimized layouts
- **Tablet**: Adaptive spacing and typography
- **Desktop**: Full sidebar, expanded views

## 🔧 Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🎨 Customization

### Colors

The project uses custom colors defined in `tailwind.config.ts`:

- Primary: Orange/Red tones for actions
- Neutral: Gray scale for backgrounds and text
- Custom: `custom-red` for brand accent

### Adding New Pages

1. Create a new folder in `src/app/`
2. Add a `page.tsx` file
3. Import `CommonTable` component
4. Filter data by desired status

### Modifying Data

Update `src/data/AllData.tsx` to:

- Add more enquiry records
- Change equipment types
- Modify pricing
- Update customer information

## 🚀 Deployment

### Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Rahul-Mallik-CSE/La-Plant-Hire-Admin)

1. Push your code to GitHub
2. Import project in Vercel
3. Configure build settings (auto-detected)
4. Deploy

### Environment Variables

No environment variables required for the demo version.

For production, add:

```env
NEXT_PUBLIC_API_URL=your_api_url
```

## 📝 Future Enhancements

- [ ] Backend API integration
- [ ] Real authentication system
- [ ] Email notifications
- [ ] Advanced search and filtering
- [ ] Export to PDF/Excel
- [ ] Calendar view for bookings
- [ ] Real-time notifications
- [ ] User role management
- [ ] Equipment inventory management
- [ ] Payment integration

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👤 Author

**Rahul Mallik**

- GitHub: [@Rahul-Mallik-CSE](https://github.com/Rahul-Mallik-CSE)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Lucide Icons](https://lucide.dev/) - Beautiful icons

## 📞 Support

For support, email support@laplanthire.com or open an issue in the repository.

---

**Note**: This is a demo application using mock data. For production use, integrate with a real backend API and authentication system.
