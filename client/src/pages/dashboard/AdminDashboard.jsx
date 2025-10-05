
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DashboardLayout from "../../layout/DashboardLayout";
import Card from "../../components/Card";
import Chart from "../../components/Chart";
import Table from "../../components/Table";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [timeRange, setTimeRange] = useState('7d');
  
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Mock data - replace with actual API calls
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalUsers: 245,
      totalProjects: 89,
      activeProjects: 34,
      completedProjects: 55,
      totalFaculty: 25,
      totalStudents: 220
    },
    recentActivity: [
      { id: 1, action: 'New project created', user: 'John Doe', time: '2 hours ago', type: 'project' },
      { id: 2, action: 'User registered', user: 'Jane Smith', time: '4 hours ago', type: 'user' },
      { id: 3, action: 'Project submitted', user: 'Mike Johnson', time: '6 hours ago', type: 'submission' },
      { id: 4, action: 'Faculty approved project', user: 'Dr. Wilson', time: '8 hours ago', type: 'approval' }
    ],
    projectStats: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Projects Created',
        data: [12, 19, 8, 15, 22, 18],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      }]
    },
    userGrowth: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'New Users',
        data: [30, 45, 35, 50, 65, 55],
        backgroundColor: 'rgba(34, 197, 94, 0.8)'
      }]
    },
    users: [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'student', department: 'CS', status: 'active', joinDate: '2024-01-15' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'faculty', department: 'IT', status: 'active', joinDate: '2024-01-10' },
      { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'student', department: 'ECE', status: 'inactive', joinDate: '2024-02-01' }
    ],
    systemHealth: {
      cpu: 45,
      memory: 67,
      storage: 23,
      uptime: '15 days, 4 hours'
    }
  });

  const StatCard = ({ title, value, change, icon, color = 'blue' }) => (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          {icon}
        </div>
      </div>
    </Card>
  );

  const ActivityItem = ({ activity }) => {
    const getActivityIcon = (type) => {
      switch (type) {
        case 'project':
          return <div className="w-2 h-2 bg-blue-500 rounded-full"></div>;
        case 'user':
          return <div className="w-2 h-2 bg-green-500 rounded-full"></div>;
        case 'submission':
          return <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>;
        case 'approval':
          return <div className="w-2 h-2 bg-purple-500 rounded-full"></div>;
        default:
          return <div className="w-2 h-2 bg-gray-500 rounded-full"></div>;
      }
    };

    return (
      <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
        {getActivityIcon(activity.type)}
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
          <p className="text-sm text-gray-500">by {activity.user}</p>
        </div>
        <span className="text-xs text-gray-400">{activity.time}</span>
      </div>
    );
  };

  const UserModal = () => (
    <Modal
      isOpen={showUserModal}
      onClose={() => setShowUserModal(false)}
      title={selectedUser ? 'Edit User' : 'Add New User'}
    >
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            defaultValue={selectedUser?.name || ''}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            defaultValue={selectedUser?.email || ''}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="flex justify-end space-x-3 pt-4">
          <Button
            variant="secondary"
            onClick={() => setShowUserModal(false)}
          >
            Cancel
          </Button>
          <Button>
            {selectedUser ? 'Update' : 'Create'} User
          </Button>
        </div>
      </form>
    </Modal>
  );

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={dashboardData.stats.totalUsers}
          change={12}
          color="blue"
          icon={
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          }
        />
        <StatCard
          title="Total Projects"
          value={dashboardData.stats.totalProjects}
          change={8}
          color="green"
          icon={
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          }
        />
        <StatCard
          title="Active Projects"
          value={dashboardData.stats.activeProjects}
          change={-3}
          color="yellow"
          icon={
            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
        />
        <StatCard
          title="Completed Projects"
          value={dashboardData.stats.completedProjects}
          change={15}
          color="purple"
          icon={
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Project Trends</h3>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
          <Chart
            type="line"
            data={dashboardData.projectStats}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false
                }
              },
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }}
          />
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
          <Chart
            type="bar"
            data={dashboardData.userGrowth}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false
                }
              },
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }}
          />
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <Button variant="secondary" size="sm">
            View All
          </Button>
        </div>
        <div className="space-y-1">
          {dashboardData.recentActivity.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
      </Card>
    </div>
  );

  const UsersTab = () => {
    const tableData = dashboardData.users.map(user => ({
      ...user,
      status: (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          user.status === 'active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {user.status}
        </span>
      ),
      role: (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          user.role === 'admin' 
            ? 'bg-purple-100 text-purple-800'
            : user.role === 'faculty'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {user.role}
        </span>
      ),
      actions: (
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setSelectedUser(user);
              setShowUserModal(true);
            }}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Edit
          </button>
          <button className="text-red-600 hover:text-red-800 text-sm">
            Delete
          </button>
        </div>
      )
    }));

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
          <Button onClick={() => setShowUserModal(true)}>
            Add New User
          </Button>
        </div>

        <Card>
          <Table
            columns={[
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'role', label: 'Role' },
              { key: 'department', label: 'Department' },
              { key: 'status', label: 'Status' },
              { key: 'joinDate', label: 'Join Date' },
              { key: 'actions', label: 'Actions' }
            ]}
            data={tableData}