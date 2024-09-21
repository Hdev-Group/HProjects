'use client'

import { useState } from 'react'
import { Search, ChevronDown, MoreHorizontal, Edit, Trash,Send } from 'lucide-react'
import { api } from '../../../convex/_generated/api'
import { useQuery, useMutation } from 'convex/react'
import AddAPI from "../buttons/feedback";
import Link from 'next/link'


export default function FeedBackMain(projectid: any) {
    const feedbacks = useQuery(api.feedback.get, { projectid: projectid.projectid })
  const [searchTerm, setSearchTerm] = useState('')

  function timeChanger(time: string) {
    const date = new Date(time)
    return date.toLocaleString()
  }
const deleteFeedbackMutation = useMutation(api.feedback.deleteFeedBack);

function deleteFeedback({ id }: { id: any}) {
    console.log(id);
    return async () => {
        await deleteFeedbackMutation({ id: id });
    }
}


  if (!feedbacks) {
    return <div>Loading...</div>
  }
  return (
    <div className="min-h-screen text-gray-100 p-8">
      <div className="">
        <div className="mb-6 flex justify-between items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-md w-96"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <AddAPI id={projectid} />
        </div>

        <div className="bg-neutral-900 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Label
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((feedback) => (
                <tr key={feedback.id} className="border-b border-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-blue-400">{feedback.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{feedback.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{feedback.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-700">
                      {feedback.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-600">
                      {feedback.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{timeChanger(feedback._creationTime)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link href={`/projects/${projectid.projectid}/tasks?addTask=true&title=${feedback.title}&description=${feedback.feedback}`}>
                        <button className="text-gray-400 hover:text-gray-100 mr-2">
                        <Send size={20} />
                        </button>
                    </Link>
                    <button onClick={deleteFeedback({id: feedback._id})} className="text-gray-400 hover:text-red-500">
                      <Trash size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}