window.DAYS_IN_WEEK = 7;
window.BASE_TEN = 10;

window.MY_FITNESS_NODE = {
  TOTAL_CLASSNAMES: "total remaining",
  VALUE_CLASSNAMES: ["positive", "negative"],
  PREVIOUS_PAGE_CLASSNAMES: "prev"
};

window.windowObject = {
  init() {
    return this.set({
      page: 0,
      total: 0
    });
  },

  get() {
    let result;

    try {
      result = JSON.parse(window.name);
    } catch (e) {
      return null;
    }

    return result;
  },

  set({ page, total }) {
    window.name = JSON.stringify({ page, total });

    return window.name;
  },

  addPageTotal(amount) {
    let { page, total } = this.get();

    if (!total) {
      total = amount;
    } else {
      total += amount;
    }

    page += 1;

    return this.set({ page, total });
  }
};

if (!windowObject.get()) {
  windowObject.init();
}

const {
  TOTAL_CLASSNAMES,
  VALUE_CLASSNAMES,
  PREVIOUS_PAGE_CLASSNAMES
} = MY_FITNESS_NODE;

// 1) --
const myFitnessTotalNodes = [
  ...document.getElementsByClassName(TOTAL_CLASSNAMES)[0].childNodes
];

// 2) --
const [pageTotalNode] = myFitnessTotalNodes.filter(node =>
  VALUE_CLASSNAMES.includes(node.className)
);

// 3) --
const pageTotalValue = parseInt(
  pageTotalNode.innerHTML.replace(",", ""),
  BASE_TEN
);

// 4) --
windowObject.addPageTotal(pageTotalValue);

// 5) locate the link pointing to the previous page
const [nextPageNode] = document.getElementsByClassName(
  PREVIOUS_PAGE_CLASSNAMES
);

// 6) advance to that page
window.location = nextPageNode.href;
