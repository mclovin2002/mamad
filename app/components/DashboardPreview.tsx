'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Video, Users, Bell, Settings, Calendar } from 'lucide-react';

export default function DashboardPreview() {
  return (
    <div className="w-full h-full bg-white rounded-2xl p-6 shadow-soft">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-semibold">Dashboard</h3>
          <p className="text-gray-500">Welcome back, Amanda</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <motion.div 
          className="bg-primary-50 p-4 rounded-lg"
          whileHover={{ scale: 1.02 }}
        >
          <MessageSquare className="w-6 h-6 text-primary-600 mb-2" />
          <div className="text-2xl font-semibold">24</div>
          <div className="text-sm text-gray-600">Active Chats</div>
        </motion.div>
        <motion.div 
          className="bg-primary-50 p-4 rounded-lg"
          whileHover={{ scale: 1.02 }}
        >
          <Video className="w-6 h-6 text-primary-600 mb-2" />
          <div className="text-2xl font-semibold">8</div>
          <div className="text-sm text-gray-600">Meetings Today</div>
        </motion.div>
        <motion.div 
          className="bg-primary-50 p-4 rounded-lg"
          whileHover={{ scale: 1.02 }}
        >
          <Users className="w-6 h-6 text-primary-600 mb-2" />
          <div className="text-2xl font-semibold">156</div>
          <div className="text-sm text-gray-600">Team Members</div>
        </motion.div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">Upcoming Meetings</h4>
          <Calendar className="w-5 h-5 text-gray-600" />
        </div>
        {[1, 2, 3].map((i) => (
          <motion.div 
            key={i}
            className="p-4 border border-gray-100 rounded-lg hover:border-primary-200 cursor-pointer"
            whileHover={{ x: 4 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Team Sync #{i}</div>
                <div className="text-sm text-gray-500">2:00 PM - 3:00 PM</div>
              </div>
              <div className="flex -space-x-2">
                {[1, 2, 3].map((j) => (
                  <div
                    key={j}
                    className="w-8 h-8 rounded-full bg-primary-100 border-2 border-white"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 