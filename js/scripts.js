document.addEventListener("DOMContentLoaded", function() {
    let Model = function() {
        this.servicesTop = 0;
        this.scroll = 0;
    }

    let View = function(model) {
        this.ARROW = document.querySelector('.arrow');
        this.HEADER = document.querySelector('header');
        this.SECTION_SERVICES = document.querySelector('section.services');
		this.TO_TOP = document.querySelector('.back-to-top');
		
		this.CAROUSEL = document.querySelector('.carousel');
		this.CAROUSEL_PREV = document.querySelector('#prev');
		this.CAROUSEL_NEXT = document.querySelector('#next');
    }

    let Controller = function(model, view) {
        this.arrowHandler = () => {
            model.servicesTop = view.SECTION_SERVICES.offsetTop;
            window.scroll({
                top: model.servicesTop,
                left: 0,
                behavior: 'smooth'
            });
        }

        this.scrollHandler = () => {
            model.scroll = window.scrollY;
            if (model.scroll > view.HEADER.offsetHeight/2) {
                view.TO_TOP.classList.add('visible');
            } else {
                view.TO_TOP.classList.remove('visible');
            }
        }

        this.moveToTop = () => {
            model.scroll = 0;
            window.scroll({
                top: model.scroll,
                left: 0,
                behavior: 'smooth'
            });
        }


        //event listeners

        view.ARROW.addEventListener('click', this.arrowHandler);
        window.addEventListener('scroll', this.scrollHandler);
		view.TO_TOP.addEventListener('click', this.moveToTop);

		
		//libraries initialisation
		let flkty = new Flickity(view.CAROUSEL, {
			cellAlign: 'left',
			draggable: true,
			contain: true,
			wrapAround: true,
			prevNextButtons: false,
			pageDots: false
		});

		view.CAROUSEL_PREV.addEventListener("click", () => flkty.previous(true));
		view.CAROUSEL_NEXT.addEventListener("click", () => flkty.next(true));
    }

    let model = new Model();
    let view = new View(model);
    let controller = new Controller(model, view);

  });