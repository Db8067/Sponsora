import EventUploadForm from "@/components/events/EventUploadForm";

export default function CreateEventPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Create New Event</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Fill out the details below to publish an event on the main platform.
        </p>
      </div>
      <EventUploadForm />
    </div>
  );
}
