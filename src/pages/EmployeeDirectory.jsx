import { useState } from 'react'
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline'

const EmployeeDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedRole, setSelectedRole] = useState('all')

  const employees = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@company.com',
      phone: '+1 (555) 123-4567',
      department: 'Engineering',
      position: 'Software Developer',
      role: 'employee',
      avatar: null,
      skills: ['React', 'JavaScript', 'Node.js']
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@company.com',
      phone: '+1 (555) 234-5678',
      department: 'Engineering',
      position: 'Engineering Manager',
      role: 'manager',
      avatar: null,
      skills: ['Leadership', 'Python', 'AWS']
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@company.com',
      phone: '+1 (555) 345-6789',
      department: 'Marketing',
      position: 'Marketing Specialist',
      role: 'employee',
      avatar: null,
      skills: ['Digital Marketing', 'SEO', 'Analytics']
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah@company.com',
      phone: '+1 (555) 456-7890',
      department: 'HR',
      position: 'HR Manager',
      role: 'admin',
      avatar: null,
      skills: ['Recruitment', 'Employee Relations', 'Training']
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david@company.com',
      phone: '+1 (555) 567-8901',
      department: 'Sales',
      position: 'Sales Representative',
      role: 'employee',
      avatar: null,
      skills: ['Sales', 'CRM', 'Negotiation']
    },
    {
      id: 6,
      name: 'Lisa Davis',
      email: 'lisa@company.com',
      phone: '+1 (555) 678-9012',
      department: 'Finance',
      position: 'Financial Analyst',
      role: 'employee',
      avatar: null,
      skills: ['Financial Analysis', 'Excel', 'Reporting']
    }
  ]

  const departments = ['all', 'Engineering', 'Marketing', 'HR', 'Sales', 'Finance']
  const roles = ['all', 'employee', 'manager', 'admin']

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment
    const matchesRole = selectedRole === 'all' || employee.role === selectedRole

    return matchesSearch && matchesDepartment && matchesRole
  })

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800'
      case 'manager':
        return 'bg-blue-100 text-blue-800'
      case 'employee':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Employee Directory</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Find and connect with your colleagues
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Search
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Search by name, email, or position"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Department Filter */}
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Department
              </label>
              <select
                id="department"
                name="department"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept === 'all' ? 'All Departments' : dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Role Filter */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Role
              </label>
              <select
                id="role"
                name="role"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role === 'all' ? 'All Roles' : role.charAt(0).toUpperCase() + role.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="px-4 py-3 sm:px-6">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Showing <span className="font-medium">{filteredEmployees.length}</span> of <span className="font-medium">{employees.length}</span> employees
          </p>
        </div>
      </div>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredEmployees.map((employee) => (
          <div key={employee.id} className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-lg font-medium text-white">
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{employee.name}</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(employee.role)}`}>
                      {employee.role.charAt(0).toUpperCase() + employee.role.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{employee.position}</p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <BuildingOfficeIcon className="h-4 w-4 mr-2" />
                  {employee.department}
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <EnvelopeIcon className="h-4 w-4 mr-2" />
                  <a href={`mailto:${employee.email}`} className="hover:text-blue-600">
                    {employee.email}
                  </a>
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <PhoneIcon className="h-4 w-4 mr-2" />
                  <a href={`tel:${employee.phone}`} className="hover:text-blue-600">
                    {employee.phone}
                  </a>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {employee.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex space-x-3">
                <button className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <EnvelopeIcon className="h-4 w-4 mr-2" />
                  Email
                </button>
                <button className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <PhoneIcon className="h-4 w-4 mr-2" />
                  Call
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredEmployees.length === 0 && (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="px-4 py-12 sm:p-6 text-center">
            <UserIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No employees found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  )
}

export default EmployeeDirectory
