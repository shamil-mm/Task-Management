import React, { useEffect, useState } from 'react';
import { getNotifications, markAsRead, removeNotification } from '../services/notificationService';
import { useSelector } from 'react-redux';
import type { INotification } from '../types/Inotification';
import { Bell, Check, Trash2, X } from 'lucide-react';

interface NotificationModalProps {
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({  onClose }) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const user = useSelector((state: any) => state.auth.user)
    useEffect(()=>{
      const fetchNotifications=async(userId:string)=>{
        const res=await getNotifications(userId)
        setNotifications(res)
      }
      fetchNotifications(user._id)
    },[user])


    const handleMarkAsRead = async(notifId: number) => {
    try {
      await markAsRead(notifId)
    } catch (error) {
      console.error('error from handle Mard as read',error)
    }
    setNotifications(prev =>
      prev.map(notif =>
        notif._id === notifId ? { ...notif, read: true } : notif
      )
    );
  };

  const handleDelete = async(notifId: number) => {
     try {
      await removeNotification(notifId)
    } catch (error) {
      console.error('error from handle Mard as read',error)
    }
    setNotifications(prev => prev.filter(notif => notif._id !== notifId));
  };
    
  return (
    <div className="fixed left-210 bottom-20 inset-0  bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-green-950 w-full max-w-md max-h-[60vh] min-h-[60vh] rounded-xl shadow-2xl flex flex-col">
       
        <div className="flex items-center justify-between p-4  border-gray-200">
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Bell className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-white ">Notifications</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

       
        <div className="flex-1 overflow-y-auto p-4">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <Bell className="w-16 h-16 mb-3 opacity-30" />
              <p className="text-lg">No notifications</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {notifications.map((notif,index) => (
                <li
                  key={index}
                  className={`p-4 rounded-lg border transition-all ${
                    notif.read
                      ? 'bg-gray-50 border-gray-200'
                      : 'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-800 truncate">
                          {notif.title}
                        </h3>
                        {!notif.read && (
                          <span className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {notif.message}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(notif.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2">
                      {!notif.read && (
                        <button
                          onClick={() => handleMarkAsRead(notif._id)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Mark as read"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(notif._id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
