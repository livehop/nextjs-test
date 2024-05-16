import React from "react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <header className="flex justify-between items-center py-4">
        <div className="flex items-center space-x-4">
          <img src="/logo.svg" alt="Logo" className="h-10" />
          <input
            type="text"
            placeholder="Search"
            className="border rounded-full py-2 px-4"
          />
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-white">Jordan Gauthier</span>
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            A
          </div>
        </div>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <section className="col-span-1 md:col-span-3">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Identity Providers</h2>
            <div className="flex space-x-4">
              <button className="bg-green-200 py-2 px-4 rounded-full">
                Ping ID
              </button>
              <button className="bg-green-200 py-2 px-4 rounded-full">
                Keycloak
              </button>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mt-4">
            <h2 className="text-xl font-bold mb-4">Recently Used</h2>
            <div className="flex space-x-4">
              <div className="bg-gray-200 py-2 px-4 rounded-full">App 1</div>
              <div className="bg-gray-200 py-2 px-4 rounded-full">App 2</div>
              <div className="bg-gray-200 py-2 px-4 rounded-full">App 3</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mt-4">
            <h2 className="text-xl font-bold mb-4">Applications</h2>
            <div className="flex space-x-4 mb-4">
              <button className="py-2 px-4 rounded-full bg-gray-300">
                All
              </button>
              <button className="py-2 px-4 rounded-full bg-gray-300">
                Connected
              </button>
              <button className="py-2 px-4 rounded-full bg-gray-300">
                Favorites
              </button>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Connected Applications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-100 p-4 rounded-lg shadow">
                  <h4 className="font-bold">App 1</h4>
                  <p>Lorem ipsum dolor sit amet.</p>
                  <div className="flex space-x-2 mt-2">
                    <button className="bg-blue-500 text-white py-1 px-2 rounded">
                      Launch
                    </button>
                    <button className="bg-gray-500 text-white py-1 px-2 rounded">
                      Notification
                    </button>
                    <button className="bg-gray-500 text-white py-1 px-2 rounded">
                      Expand
                    </button>
                    <button className="bg-red-500 text-white py-1 px-2 rounded">
                      Disconnect
                    </button>
                  </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow">
                  <h4 className="font-bold">App 2</h4>
                  <p>Lorem ipsum dolor sit amet.</p>
                  <div className="flex space-x-2 mt-2">
                    <button className="bg-blue-500 text-white py-1 px-2 rounded">
                      Launch
                    </button>
                    <button className="bg-gray-500 text-white py-1 px-2 rounded">
                      Notification
                    </button>
                    <button className="bg-gray-500 text-white py-1 px-2 rounded">
                      Expand
                    </button>
                    <button className="bg-red-500 text-white py-1 px-2 rounded">
                      Disconnect
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">
                Not Connected Applications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-100 p-4 rounded-lg shadow">
                  <h4 className="font-bold">App 4</h4>
                  <p>Lorem ipsum dolor sit amet.</p>
                  <div className="flex space-x-2 mt-2">
                    <button className="bg-green-500 text-white py-1 px-2 rounded">
                      Connect
                    </button>
                    <button className="bg-blue-500 text-white py-1 px-2 rounded">
                      Launch
                    </button>
                  </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow">
                  <h4 className="font-bold">App 5</h4>
                  <p>Lorem ipsum dolor sit amet.</p>
                  <div className="flex space-x-2 mt-2">
                    <button className="bg-green-500 text-white py-1 px-2 rounded">
                      Connect
                    </button>
                    <button className="bg-blue-500 text-white py-1 px-2 rounded">
                      Launch
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <aside className="col-span-1">
          <div className="bg-white p-4 rounded-lg shadow mb-4">
            <h2 className="text-xl font-bold mb-4">Feed</h2>
            <div className="space-y-2">
              <div className="bg-gray-200 p-2 rounded-lg">
                App 1: Notification content
              </div>
              <div className="bg-gray-200 p-2 rounded-lg">
                App 2: Notification content
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Tickets</h2>
            <div className="space-y-2">
              <div className="bg-gray-200 p-2 rounded-lg">
                <h4 className="font-bold">Ticket #1</h4>
                <p>Status: Closed</p>
              </div>
              <div className="bg-gray-200 p-2 rounded-lg">
                <h4 className="font-bold">Ticket #2</h4>
                <p>Status: Waiting for an answer</p>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
