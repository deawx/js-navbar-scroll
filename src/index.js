import './sass/main.scss'

class Navbar {
  constructor(props) {
    this.navbarItems = props.navbarItems
    this.sections = props.sections
    this.scroll()
  }

  init() {
    let pos = 0

    // check window position and set current section
    for (let i = 0; i < this.sections.length; i++) {
      if (
        this.sections[i].offsetTop <= window.pageYOffset &&
        this.sections[i].offsetTop + this.sections[i].offsetHeight > window.pageYOffset
      ) {
        pos = i
      }
    }

    // set current navbar items
    for (let j = 0; j < this.navbarItems.length; j++) {
      if (j === pos) {
        this.navbarItems[j].classList.add('current')
      } else {
        this.navbarItems[j].classList.remove('current')
      }

      // onclick event for navbar link
      let link = this.navbarItems[j].getElementsByTagName('a')
      // link[0].onclick = (e) => {
      //   this.handleClick(e, link[0])
      // }
      link[0].onclick = (e) => {
        for (let k = 0; k < this.navbarItems.length; k++) {
            this.navbarItems[k].classList.remove('current')
        }
        this.navbarItems[j].classList.add('current')
        this.handleClick(e, link[0])
      }
    }
  }

  scroll() {
    document.addEventListener('wheel', () => {
      this.init()
    })
  }

  handleClick(e, elem) {
    e.preventDefault()

    // animation scroll
    const scrollTo = ((elem, to, duration) => {
      if (duration <= 0) return
      let difference = to - elem.scrollTop
      let perTick = difference / duration * 10

      setTimeout(() => {
          elem.scrollTop = elem.scrollTop + perTick
          if (elem.scrollTop === to) return
          scrollTo(elem, to, duration - 10)
      }, 10)
    })
    
    // call scroll to selected element
    const documentElem = (document.scrollingElement === undefined) ? document.documentElement : document.body
    scrollTo(documentElem, document.getElementById(elem.innerHTML.toLowerCase()).offsetTop, 600)
  }

}

let N = new Navbar({
  navbarItems: document.getElementsByClassName('navbar-item'),
  sections: document.getElementsByClassName('section')
})

N.init()
