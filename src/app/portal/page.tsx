import React from "react";
import { VscDebugDisconnect } from "react-icons/vsc";

const Portal = () => {
  return (
    <div className="min-h-screen bg-white-900 px-32">
      <header className="flex justify-between items-center py-4 px-8 bg-white-900">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex justify-center items-center font-bold">
          <img src="/logo_red.svg" alt="Logo" className="h-10 text-red-100" />
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search"
            className="border rounded-full py-2 px-4"
          />
          <span className="text-black">Jordan Gauthier</span>
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
              <button className="bg-green-800 py-1 px-8 rounded-full font-bold text-gray-100">
                Ping ID
              </button>
              <button className="bg-green-800 py-1 px-8 rounded-full font-bold text-gray-100">
                Keycloak
              </button>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mt-4">
            <h2 className="text-xl font-bold mb-4">Recently Used</h2>
            <div className="flex space-x-4">
              <div className="w-20 h-20 bg-red-200 rounded-full flex justify-center items-center font-bold">
                <p>App 1</p>
              </div>
              <div className="w-20 h-20 bg-teal-200 rounded-full flex justify-center items-center font-bold">
                <p>App 2</p>
              </div>
              <div className="w-20 h-20 bg-indigo-200 rounded-full flex justify-center items-center font-bold">
                <p>App 3</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow mt-4">
            <h2 className="text-xl font-bold mb-4">Applications</h2>
            <div className="flex space-x-4 mb-4">
              <button className="bg-green-800 py-1 px-12 rounded-full font-bold text-gray-100">
                All
              </button>
              <button className="bg-green-600 py-1 px-8 rounded-full font-bold text-gray-100">
                Connected
              </button>
              <button className="bg-orange-400 py-1 px-8 rounded-full font-bold text-gray-100">
                Not Connected
              </button>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Connected Applications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg shadow">
                  <div className="flex item-center justify-between">
                    <div className="flex gap-4 item-end justify-end">
                      <div className="w-12 h-12 bg-red-200 rounded-full flex justify-center items-center font-bold">
                        <p>A 1</p>
                      </div>
                      <h4 className="pt-3 font-bold">App 1</h4>
                    </div>
                    <VscDebugDisconnect className="bg-red-50 h-10 w-10 rounded-full font-bold text-gray-700" />
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc pellentesque, enim et ultricies tristique, eros sem
                    fringilla ante, sit amet gravida tortor nibh in eros. Nam
                    convallis elit at sem interdum, eu rutrum nibh laoreet.
                    Pellentesque gravida odio erat, vel tempor sem faucibus
                    imperdiet. Mauris faucibus placerat mi, et aliquam dolor
                    mattis at.
                  </p>
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
                <div className="bg-gray-50 p-4 rounded-lg shadow">
                  <div className="flex item-center justify-between">
                    <div className="flex gap-4 item-end justify-end">
                      <div className="w-12 h-12 bg-blue-200 rounded-full flex justify-center items-center font-bold">
                        <p>A 2</p>
                      </div>
                      <h4 className="pt-3 font-bold">App 2</h4>
                    </div>
                    <VscDebugDisconnect className="bg-red-50 h-10 w-10 rounded-full font-bold text-gray-700" />
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc pellentesque, enim et ultricies tristique, eros sem
                    fringilla ante, sit amet gravida tortor nibh in eros. Nam
                    convallis elit at sem interdum, eu rutrum nibh laoreet.
                    Pellentesque gravida odio erat, vel tempor sem faucibus
                    imperdiet. Mauris faucibus placerat mi, et aliquam dolor
                    mattis at.
                  </p>
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
            <div className="mt-8">
              <h3 className="text-lg font-bold mb-2">
                Not Connected Applications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-yellow-50 p-4 rounded-lg shadow">
                  <div className="flex item-center justify-between">
                    <div className="flex gap-4 item-end justify-end">
                      <div className="w-12 h-12 bg-red-200 rounded-full flex justify-center items-center font-bold">
                        <p>A 1</p>
                      </div>
                      <h4 className="pt-3 font-bold">App 1</h4>
                    </div>
                    <VscDebugDisconnect className="bg-red-50 h-10 w-10 rounded-full font-bold text-gray-700" />
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc pellentesque, enim et ultricies tristique, eros sem
                    fringilla ante, sit amet gravida tortor nibh in eros. Nam
                    convallis elit at sem interdum, eu rutrum nibh laoreet.
                    Pellentesque gravida odio erat, vel tempor sem faucibus
                    imperdiet. Mauris faucibus placerat mi, et aliquam dolor
                    mattis at.
                  </p>
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
                <div className="bg-yellow-50 p-4 rounded-lg shadow">
                  <div className="flex item-center justify-between">
                    <div className="flex gap-4 item-end justify-end">
                      <div className="w-12 h-12 bg-blue-200 rounded-full flex justify-center items-center font-bold">
                        <p>A 2</p>
                      </div>
                      <h4 className="pt-3 font-bold">App 2</h4>
                    </div>
                    <VscDebugDisconnect className="bg-red-50 h-10 w-10 rounded-full font-bold text-gray-700" />
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc pellentesque, enim et ultricies tristique, eros sem
                    fringilla ante, sit amet gravida tortor nibh in eros. Nam
                    convallis elit at sem interdum, eu rutrum nibh laoreet.
                    Pellentesque gravida odio erat, vel tempor sem faucibus
                    imperdiet. Mauris faucibus placerat mi, et aliquam dolor
                    mattis at.
                  </p>
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
};

export default Portal;
