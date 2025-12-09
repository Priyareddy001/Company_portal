import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { 
  UserIcon, 
  EnvelopeIcon, 
  BuildingOfficeIcon,
  BriefcaseIcon,
  PhoneIcon,
  MapPinIcon,
  PencilIcon
} from '@heroicons/react/24/outline'

const Profile = () => {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, State 12345',
    emergencyContact: 'Jane Doe - +1 (555) 987-6543',
    skills: ['React', 'JavaScript', 'Node.js', 'Python'],
    bio: 'Experienced software developer with a passion for creating innovative solutions.'
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = () => {
    // In a real app, this would save to the backend
    setIsEditing(false)
    // Show success message
  }

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, City, State 12345',
      emergencyContact: 'Jane Doe - +1 (555) 987-6543',
      skills: ['React', 'JavaScript', 'Node.js', 'Python'],
      bio: 'Experienced software developer with a passion for creating innovative solutions.'
    })
    setIsEditing(false)
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-white dark:bg-gray-800 px-6 py-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-blue-500 dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-500 flex items-center justify-center ring-4 ring-blue-100 dark:ring-white/20">
                    <span className="text-xl sm:text-2xl font-bold text-white">
                      {user?.name?.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{user?.name}</h1>
                    <p className="text-gray-600 dark:text-gray-300">{user?.position}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user?.department}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 border border-transparent rounded-lg text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Personal Information */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
              Personal Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                ) : (
                  <div className="mt-1 flex items-center">
                    <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900 dark:text-white">{formData.name}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                ) : (
                  <div className="mt-1 flex items-center">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900 dark:text-white">{formData.email}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                ) : (
                  <div className="mt-1 flex items-center">
                    <PhoneIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900 dark:text-white">{formData.phone}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={2}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                ) : (
                  <div className="mt-1 flex items-center">
                    <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900 dark:text-white">{formData.address}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Emergency Contact
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                ) : (
                  <div className="mt-1 flex items-center">
                    <PhoneIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900 dark:text-white">{formData.emergencyContact}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Work Information */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
              Work Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Position
                </label>
                <div className="mt-1 flex items-center">
                  <BriefcaseIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-900 dark:text-white">{user?.position}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Department
                </label>
                <div className="mt-1 flex items-center">
                  <BuildingOfficeIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-900 dark:text-white">{user?.department}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Employee ID
                </label>
                <div className="mt-1 flex items-center">
                  <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-900 dark:text-white">EMP-{user?.id?.toString().padStart(4, '0')}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Skills
                </label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={3}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">{formData.bio}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {isEditing && (
        <div className="flex justify-end space-x-3">
          <button
            onClick={handleCancel}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
        </div>
      )}
        </div>
      </div>
    </div>
  )
}

export default Profile
