# Technical Architecture

## 1. Technology Stack
- **Frontend & Backend**: Next.js 14 (App Router)
- **Authentication**: Clerk
- **Database**: Supabase (PostgreSQL)
- **File Storage**: Cloudinary
- **Payments**: Razorpay
- **Styling**: Tailwind CSS + Lucide Icons

## 2. Architecture Overview
- **Main App (`main-app`)**: Serves public users, participants, organizers, and sponsors.
- **Admin App (`admin-app`)**: Separate Next.js application for super-admin controls.
- **Database Layer**: Centralized Supabase PostgreSQL handling realtime data and chats.

## 3. Database Schema
- `users`: Synchronized with Clerk.
- `events`: Managed by admins and organizers.
- `organizer_profiles` / `sponsor_profiles`: Role-specific metadata.
- `registrations` / `bookmarks`: Participant activity.
- `chat_rooms` / `messages`: Realtime communication.
