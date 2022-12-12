import { Button } from '@dts-stn/service-canada-design-system'
import { Fragment } from 'react'
import Markdown from 'markdown-to-jsx'

function ContactSectionRow(props) {
  const { label, detail, index, highlight, button } = props
  return label && detail ? (
    <div
      className={`grid grid-cols-5 gap-4 border-t-2 mt-4 ${
        highlight && 'bg-blue-100'
      }`}
      key={index}
    >
      <div className="col-span-1 font-bold text-xl">{label}</div>
      <div className="col-span-4 [&_ul]:list-inside [&_ul]:ml-4 [&_ul]:list-disc">
        {button ? (
          <Button text={detail} styling={'primary'} />
        ) : (
          <Markdown>{detail}</Markdown>
        )}
      </div>
    </div>
  ) : (
    <Fragment key={index} />
  )
}

export default ContactSectionRow
