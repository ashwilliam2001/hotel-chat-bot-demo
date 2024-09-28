'use client'

import { useState } from 'react'
import { Button } from "../../components/ui/button"
import { ScrollArea } from "../../components/ui/scroll-area"
import { Badge } from "../../components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { CheckCircle, Clock, Loader2 } from "lucide-react"

export default function StaffDashboard() {
  const [orders, setOrders] = useState([
    { id: 2, customer: 'Jane Smith', item: 'Extra Towels', status: 'In Progress', bookingNumber: 'BK002', roomNumber: '202', orderTime: new Date(Date.now() - 30 * 60000).toISOString() },
    { id: 1, customer: 'John Doe', item: 'Room Service', status: 'Pending', bookingNumber: 'BK001', roomNumber: '101', orderTime: new Date(Date.now() - 60 * 60000).toISOString() },
  ])

  const updateOrderStatus = (id: number, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ).sort((a, b) => new Date(b.orderTime).getTime() - new Date(a.orderTime).getTime()))
  }

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'In Progress':
        return <Loader2 className="h-5 w-5 text-yellow-500 animate-spin" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getBadgeVariant = (status: string) => {
    switch(status) {
      case 'Completed':
        return 'default'
      case 'In Progress':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  return (
    <div className="w-full max-w-4xl h-screen bg-background">
      <div className="bg-primary text-primary-foreground p-4">
        <h2 className="text-2xl font-bold">Staff Dashboard</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-80px)] p-4">
        {orders.map(order => (
          <Card key={order.id} className="mb-4 overflow-hidden">
            <CardHeader className="bg-muted">
              <CardTitle className="flex justify-between items-center">
                <span>Order #{order.id}</span>
                <Badge 
                  variant={getBadgeVariant(order.status)}
                  className="ml-2"
                >
                  {getStatusIcon(order.status)}
                  <span className="ml-1">{order.status}</span>
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-2">
                <p><strong>Customer:</strong> {order.customer}</p>
                <p><strong>Booking Number:</strong> {order.bookingNumber}</p>
                <p><strong>Room Number:</strong> {order.roomNumber}</p>
                <p><strong>Item:</strong> {order.item}</p>
                <p><strong>Order Time:</strong> {new Date(order.orderTime).toLocaleString()}</p>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                {order.status !== 'Pending' && (
                  <Button onClick={() => updateOrderStatus(order.id, 'Pending')} variant="outline" size="sm">
                    Mark as Pending
                  </Button>
                )}
                {order.status !== 'In Progress' && (
                  <Button onClick={() => updateOrderStatus(order.id, 'In Progress')} variant="outline" size="sm">
                    Mark as In Progress
                  </Button>
                )}
                {order.status !== 'Completed' && (
                  <Button onClick={() => updateOrderStatus(order.id, 'Completed')} variant="outline" size="sm">
                    Mark as Completed
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>
    </div>
  )
}