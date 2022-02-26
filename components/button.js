import { useRouter } from 'next/router'

function RedirectButton({ children, href }) {
  const router = useRouter()

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <button className="px-2" href={href} onClick={handleClick}><span className="px-3 rounded-full bg-blue-400">{children}</span></button>
  )
}

export default RedirectButton
