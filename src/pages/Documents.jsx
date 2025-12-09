import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { 
  DocumentTextIcon, 
  DocumentArrowUpIcon,
  DocumentArrowDownIcon,
  FolderIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  TrashIcon,
  ShareIcon,
  PlusIcon
} from '@heroicons/react/24/outline'

const Documents = () => {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [showUploadModal, setShowUploadModal] = useState(false)

  const documentCategories = [
    { id: 'all', name: 'All Documents', icon: DocumentTextIcon },
    { id: 'hr', name: 'HR Documents', icon: FolderIcon },
    { id: 'policies', name: 'Policies', icon: DocumentTextIcon },
    { id: 'forms', name: 'Forms', icon: DocumentTextIcon },
    { id: 'training', name: 'Training Materials', icon: FolderIcon },
    { id: 'personal', name: 'Personal Documents', icon: FolderIcon }
  ]

  const documentTypes = [
    { id: 'all', name: 'All Types' },
    { id: 'pdf', name: 'PDF' },
    { id: 'doc', name: 'Word Document' },
    { id: 'xls', name: 'Excel Spreadsheet' },
    { id: 'ppt', name: 'PowerPoint' },
    { id: 'image', name: 'Image' }
  ]

  const documents = [
    {
      id: 1,
      name: 'Employee Handbook 2024',
      category: 'hr',
      type: 'pdf',
      size: '2.4 MB',
      uploadDate: '2024-01-15',
      uploadedBy: 'HR Department',
      description: 'Complete employee handbook with policies and procedures',
      isPublic: true
    },
    {
      id: 2,
      name: 'Leave Request Form',
      category: 'forms',
      type: 'doc',
      size: '156 KB',
      uploadDate: '2024-01-10',
      uploadedBy: 'HR Department',
      description: 'Standard leave request form for all employees',
      isPublic: true
    },
    {
      id: 3,
      name: 'Remote Work Policy',
      category: 'policies',
      type: 'pdf',
      size: '890 KB',
      uploadDate: '2024-01-08',
      uploadedBy: 'HR Department',
      description: 'Updated remote work policy and guidelines',
      isPublic: true
    },
    {
      id: 4,
      name: 'React Training Materials',
      category: 'training',
      type: 'ppt',
      size: '5.2 MB',
      uploadDate: '2024-01-05',
      uploadedBy: 'Training Team',
      description: 'Comprehensive React.js training presentation',
      isPublic: true
    },
    {
      id: 5,
      name: 'Performance Review Template',
      category: 'hr',
      type: 'doc',
      size: '234 KB',
      uploadDate: '2024-01-03',
      uploadedBy: 'HR Department',
      description: 'Template for annual performance reviews',
      isPublic: false
    },
    {
      id: 6,
      name: 'Company Logo Assets',
      category: 'personal',
      type: 'image',
      size: '1.8 MB',
      uploadDate: '2024-01-01',
      uploadedBy: 'Marketing Team',
      description: 'High-resolution company logo files',
      isPublic: true
    }
  ]

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory
    const matchesType = selectedType === 'all' || doc.type === selectedType
    return matchesSearch && matchesCategory && matchesType
  })

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <DocumentTextIcon className="h-8 w-8 text-red-500" />
      case 'doc':
        return <DocumentTextIcon className="h-8 w-8 text-blue-500" />
      case 'xls':
        return <DocumentTextIcon className="h-8 w-8 text-green-500" />
      case 'ppt':
        return <DocumentTextIcon className="h-8 w-8 text-orange-500" />
      case 'image':
        return <DocumentTextIcon className="h-8 w-8 text-purple-500" />
      default:
        return <DocumentTextIcon className="h-8 w-8 text-gray-500" />
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'hr':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      case 'policies':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      case 'forms':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
      case 'training':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
      case 'personal':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
    }
  }

  const handleDownload = (document) => {
    // In a real app, this would trigger the download
    console.log('Downloading:', document.name)
  }

  const handleShare = (document) => {
    // In a real app, this would open a share dialog
    console.log('Sharing:', document.name)
  }

  const handleDelete = (document) => {
    // In a real app, this would delete the document
    console.log('Deleting:', document.name)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-white dark:bg-gray-800 px-6 py-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Documents</h1>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    Manage and access your company documents
                  </p>
                </div>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-sm font-medium text-white hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Upload Document
                </button>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <MagnifyingGlassIcon className="h-5 w-5 mr-2 text-blue-600" />
                Search & Filter
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {/* Search */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Search Documents
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      placeholder="Search by name or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    {documentCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    File Type
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    {documentTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-3">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing <span className="font-medium">{filteredDocuments.length}</span> of <span className="font-medium">{documents.length}</span> documents
              </p>
            </div>
          </div>

          {/* Documents Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredDocuments.map((document) => (
              <div key={document.id} className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(document.type)}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {document.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {document.size} • {document.type.toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleDownload(document)}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Download"
                      >
                        <DocumentArrowDownIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleShare(document)}
                        className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                        title="Share"
                      >
                        <ShareIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(document)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {document.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(document.category)}`}>
                      {documentCategories.find(cat => cat.id === document.category)?.name}
                    </span>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(document.uploadDate).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>By {document.uploadedBy}</span>
                      <span className={`px-2 py-1 rounded-full ${
                        document.isPublic 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                      }`}>
                        {document.isPublic ? 'Public' : 'Private'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredDocuments.length === 0 && (
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-12 text-center">
                <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No documents found</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Try adjusting your search criteria or filters.
                </p>
              </div>
            </div>
          )}

          {/* Upload Modal */}
          {showUploadModal && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
              <div className="relative top-20 mx-auto p-5 border border-gray-200 dark:border-gray-700 w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
                <div className="mt-3">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Upload Document</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Select File
                      </label>
                      <input
                        type="file"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Category
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                        {documentCategories.slice(1).map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Brief description of the document..."
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      onClick={() => setShowUploadModal(false)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setShowUploadModal(false)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Documents
