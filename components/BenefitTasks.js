import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

export default function BenefitTasks(props) {
  return (
    <div className="px-4 sm:pl-8">
      <h3 className="font-display font-bold text-xl ">
        {props.taskList.header}
      </h3>
      <ul className="w-full py-6 pl-2 space-y-8">
        {props.taskList.tasks.map((task, index) => {
          return (
            <li key={index} className="font-display font-bold ">
              <Link href={task.link} passHref>
                <a className="flex items-center underline text-deep-blue-dark hover:text-blue-hover">
                  <FontAwesomeIcon
                    icon={task.icon}
                    className="pr-4 text-2xl w-8"
                  />
                  <span className="font-normal text-xl">{task.task}</span>
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

BenefitTasks.propTypes = {
  taskList: PropTypes.shape({
    header: PropTypes.string.isRequired,
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        task: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        icon: PropTypes.object.isRequired,
      })
    ),
  }),
}