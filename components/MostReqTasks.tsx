// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
// import { icon } from '../lib/loadIcons'

interface Task {
  title: string
  areaLabel: string
  link: string
  icon?: string
  betaPopUp?: boolean
  id: string
}

interface TaskList {
  title: string
  tasks: Task[]
}

interface MostReqTasksProps {
  dataCy?: string
  taskListMR: TaskList

  refPageAA: string
  acronym: string
}

const MostReqTasks = ({
  dataCy,
  taskListMR,
  refPageAA,
  acronym,
}: MostReqTasksProps) => {
  const newTabTaskExceptions: string[] = [
    'https://protege-secure.pca-cal.ca/en/Account/Authorize',
    'https://protege-secure.pca-cal.ca/fr/Compte/Autoriser',
  ]

  return (
    <div className="h-full">
      <h3
        className="pl-3 pt-6 text-xl font-bold text-white sm:pl-8 md:pl-15 "
        data-cy={dataCy}
      >
        {taskListMR.title}
      </h3>
      <ul
        className="flex w-full list-outside list-disc flex-col pb-5 pl-8 pt-2 text-white sm:px-12 md:px-20 md:pt-4"
        data-cy="most-req-links"
      >
        {taskListMR.tasks.map((task, index) => {
          return (
            <li
              key={index}
              className="justify-center py-2 font-bold"
              data-cy="most-req-tasklink"
            >
              <Link
                href={task.link}
                passHref
                target={
                  newTabTaskExceptions.includes(task.link) ? '_blank' : '_self'
                }
                rel={
                  newTabTaskExceptions.includes(task.link)
                    ? 'noopener noreferrer'
                    : undefined
                }
                data-gc-analytics-customclick={`${refPageAA} ${acronym}:${task.id}`}
                className=" rounded-sm text-white underline hover:text-gray-50a focus:outline-1 focus:outline-white"
              >
                <span
                  aria-label={task.areaLabel}
                  className="text-xl font-normal"
                >
                  {task.title}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

MostReqTasks.defaultProps = {
  taskListMR: [
    {
      tasks: [
        {
          icon: 'question-circle', // To ensure a value is used for FontAwesome icons
        },
      ],
    },
  ],
}

export default MostReqTasks
