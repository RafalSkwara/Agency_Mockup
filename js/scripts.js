document.addEventListener("DOMContentLoaded", function() {
    let Model = function() {
        this.servicesTop = 0;
		this.scroll = 0;
		
		this.menuVisible = false;
    }

    let View = function(model) {
		//-- menu related selectors
		this.SECTIONS = document.querySelectorAll("section");
		this.MENU = document.querySelector('.menu');
		this.MENU_TOGGLE_MAIN = document.querySelector('.menu-toggle--main');
		this.MENU_TOGGLE = document.querySelectorAll('.menu-toggle');
		this.MENU_BTNS = document.querySelectorAll(".menu__item");
		
		//-- back-to-top related selectors
        this.ARROW = document.querySelector('.arrow');
        this.HEADER = document.querySelector('header');
        this.SECTION_SERVICES = document.querySelector('section.services');
		this.TO_TOP = document.querySelector('.back-to-top');
		
		//-- carousel selectors
		this.CAROUSEL = document.querySelector('.carousel');
		this.CAROUSEL_PREV = document.querySelector('#prev');
		this.CAROUSEL_NEXT = document.querySelector('#next');
    }
	
    let Controller = function(model, view) {
		//-- helper functions
		this.moveToTop = () => {
			model.scroll = 0;
			window.scroll({
				top: model.scroll,
				left: 0,
				behavior: 'smooth'
			});
		};
		
		this.menuHandler = () => {
			if (model.menuVisible) {
				view.MENU.classList.remove('visible');
				model.menuVisible = false;
				console.log(view.MENU_TOGGLE_MAIN.style.display);
				
				view.MENU_TOGGLE_MAIN.classList.add('visible')
			} else {
				view.MENU.classList.add('visible');
				model.menuVisible = true;
				view.MENU_TOGGLE_MAIN.classList.remove('visible')
			}
		};

		//-- handler functions
        this.arrowHandler = () => {
            model.servicesTop = view.SECTION_SERVICES.offsetTop;
            window.scroll({
                top: model.servicesTop,
                left: 0,
                behavior: 'smooth'
            });
        };

        this.scrollHandler = () => {
            model.scroll = window.scrollY;
            if (model.scroll > view.HEADER.offsetHeight/2) {
                view.TO_TOP.classList.add('visible');
            } else {
                view.TO_TOP.classList.remove('visible');
            }
        };


		this.menuClickHandler = (e) => {
			e.preventDefault();
			let data = e.target.dataset.js;
			let el = [...view.SECTIONS].filter(el => el.classList.contains(data));
			console.log(el);
			let offset = el[0].offsetTop;
			window.scroll({
				top: offset,
				left: 0,
				behavior: 'smooth'
			});
		};

		//event listeners
		
		//listener for menu items
		view.MENU_BTNS.forEach(element => {
			element.addEventListener('click', (e) => this.menuClickHandler(e));
		});

		//listener for menu toggling
		view.MENU_TOGGLE.forEach(el => el.addEventListener('click', this.menuHandler));

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