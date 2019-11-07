const style = `body {
    font-family: "Roboto", sans-serif;
    font-size: 15px;
    line-height: 1.50;
    color: #000000;
    text-decoration: none;
    word-spacing: normal;
    text-align: left;
    letter-spacing: 0;
    -webkit-font-smoothing: antialiased;
    margin: 0;
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
    pointer-events: all;
}

#myCanvas {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background: #ebebeb;
    cursor: default;
    pointer-events: all;
    margin: 0;
}

#myNavCubeCanvas {
    position: absolute;
    width: 200px;
    height: 200px;
    bottom: 10px;
    right: 270px;
    z-index: 200000;
}

#mySectionPlanesOverviewCanvas {
    position: absolute;
    width: 250px;
    height: 250px;
    bottom: 70px;
    right: 10px;
    z-index: 200000;
}

#toolbar {
    background: #ebebeb;
    align-items: center;
    justify-content: center;
    padding: 10px;
    pointer-events: all;
}

#models-toolbar {
    align-items: center;
    justify-content: center;
    padding: 10px;
}

#structure-toolbar {
    align-items: center;
    justify-content: center;
    padding: 10px;
}

#classes-toolbar {
    align-items: center;
    justify-content: center;
    padding: 10px;
}

#bcf-toolbar {
    align-items: center;
    justify-content: center;
    padding: 10px;
}

#sections-toolbar {
    align-items: center;
    justify-content: center;
    padding: 10px;
}

.container-fluid {
    padding-right: 0;
    padding-left: 0;
}

.column-content {
    height: 90vh;
    background: #e4f1fe;
    text-align: center;
    padding: 0;
    margin: 0;
}

.col-sm {
    padding: 0;
    margin: 0;
}

.col-sm-8 {
    padding: 0;
    margin: 0;
}

.row {
    padding: 0;
    margin: 0;
}

footer {
    height: 10vh;
    background: #333;
    color: white;
}

.inspire-tree li {
    text-align: left;
}

.tree-panel {
    padding: 10px;
    overflow-x: hidden;
    pointer-events: all;
}

#models-list {
    padding: 10px;
}

p {
    font-family: "Poppins", sans-serif;
    font-size: 1.1em;
    font-weight: 300;
    line-height: 1.7em;
    color: #999;
}

a,
a:hover,
a:focus {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s;
}

.navbar {
    padding: 15px 10px;
    background: #fff;
    border: none;
    border-radius: 0;
    margin-bottom: 40px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.navbar-btn {
    box-shadow: none;
    outline: none !important;
    border: none;
}

.line {
    width: 100%;
    height: 1px;
    border-bottom: 1px dashed #ddd;
    margin: 40px 0;
}

.wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: stretch;
    z-index: 10000;
}

#sidebar {
    min-width: 320px;
    max-width: 320px;
    background: #7386D5;
    color: #fff;
    transition: all 0.3s;
    padding: 0;
}

#sidebar.active {
    margin-left: -320px;
}

#sidebar .sidebar-header {
    padding: 0;
    background: #6d7fcc;
}

#sidebar ul.components {
    padding: 20px 0;
    border-bottom: 1px solid #47748b;
}

#sidebar ul p {
    color: #fff;
    padding: 10px;
}

#sidebar ul li a {
    padding: 10px;
    font-size: 1.1em;
    display: block;
}

#sidebar ul li a:hover {
    color: #7386D5;
    background: #fff;
}

#sidebar ul li.active>a,
a[aria-expanded="true"] {
    color: #fff;
    background: #6d7fcc;
}

#sidebar2 {
    min-width: 250px;
    max-width: 250px;
    background: #7386D5;
    color: #fff;
    transition: all 0.3s;
}

#sidebar2.active {
    margin-right: -250px;
}

#sidebar2 .sidebar-header {
    padding: 0px;
    background: #6d7fcc;
}

#sidebar2 ul.components {
    padding: 20px 0;
    border-bottom: 1px solid #47748b;
}

#sidebar2 ul p {
    color: #fff;
    padding: 10px;
}

#sidebar2 ul li a {
    padding: 10px;
    font-size: 1.1em;
    display: block;
}

#sidebar2 ul li a:hover {
    color: #7386D5;
    background: #fff;
}

#sidebar2 ul li.active>a,
a[aria-expanded="true"] {
    color: #fff;
    background: #6d7fcc;
}

a[data-toggle="collapse"] {
    position: relative;
}

.dropdown-toggle::after {
    display: block;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
}

ul ul a {
    font-size: 0.9em !important;
    padding-left: 30px !important;
    background: #6d7fcc;
}

ul.CTAs {
    padding: 20px;
}

ul.CTAs a {
    text-align: center;
    font-size: 0.9em !important;
    display: block;
    border-radius: 5px;
    margin-bottom: 5px;
}

a.download {
    background: #fff;
    color: #7386D5;
}

a.article,
a.article:hover {
    background: #6d7fcc !important;
    color: #fff !important;
}

#content {
    width: 100%;
    height: 100%;
    padding: 0;
    min-height: 100vh;
    transition: all 0.3s;
    pointer-events: none;
}

@media (max-width: 768px) {
    #sidebar {
        margin-left: -270px;
    }
    #sidebar.active {
        margin-left: 0;
    }
    #sidebarCollapse span {
        display: none;
    }
}

.loader {
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid blue;
    border-right: 16px solid green;
    border-bottom: 16px solid red;
    width: 80px;
    height: 80px;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
}

@-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}`;

export {style};