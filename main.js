/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene();
var flagProjection = true;

var meshCar;

/**
 * OBJ和材质文件mtl加载
 */
var OBJLoader = new THREE.OBJLoader();//obj加载器
var MTLLoader = new THREE.MTLLoader();//材质文件加载器

MTLLoader.load('ferrari_laferrari/Ferrari LaFerrari.mtl', function (materials) {
    //obj的模型会和MaterialCreator包含的材质对应起来
    OBJLoader.setMaterials(materials);
    OBJLoader.load('ferrari_laferrari/Ferrari LaFerrari.obj', function (obj) {
        obj.scale.set(10, 10, 10); //放大obj组对象
        obj.rotateX(4.7123889803847);//旋转模型到合适位置

        meshCar = obj;
        scene.add(meshCar);//返回的组对象插入场景中
    })
})

/**
 * 地板模型和光源模型
 */
//地板模型
var geometryBoard = new THREE.BoxGeometry(200, 10, 200);
var materialBoard = new THREE.MeshLambertMaterial({
    color: 0x444444,
});
var meshBoard = new THREE.Mesh(geometryBoard, materialBoard); //网格模型对象Mesh
meshBoard.translateY(-35);
scene.add(meshBoard);

//点光源模型
var geometryLight = new THREE.SphereGeometry(2, 2, 2);
var materialLight = new THREE.MeshLambertMaterial({
    color: 0xffffff,
});
var meshLight = new THREE.Mesh(geometryLight, materialLight); //网格模型对象Mesh
meshLight.translateX(100);
meshLight.translateY(100);
meshLight.translateZ(100);
scene.add(meshLight);

//玻璃板模型1
var geometryGlassBoard1 = new THREE.BoxGeometry(200, 160, 4);
var materialGlassBoard1 = new THREE.MeshLambertMaterial({
    color: 0x444444,
    opacity: 0.3,
    transparent: true,
});
var meshGlassBoard1 = new THREE.Mesh(geometryGlassBoard1, materialGlassBoard1); //网格模型对象Mesh
meshGlassBoard1.translateZ(-100);
meshGlassBoard1.translateY(40);
scene.add(meshGlassBoard1);

//玻璃板模型1
var geometryGlassBoard2 = new THREE.BoxGeometry(4, 160, 200);
var materialGlassBoard2 = new THREE.MeshLambertMaterial({
    color: 0x444444,
    opacity: 0.3,
    transparent: true,
});
var meshGlassBoard2 = new THREE.Mesh(geometryGlassBoard2, materialGlassBoard2); //网格模型对象Mesh
meshGlassBoard2.translateX(-100);
meshGlassBoard2.translateY(40);
scene.add(meshGlassBoard2);

/**
 * 光源设置
 */
//点光源
var point = new THREE.PointLight(0xffffff);
point.position.set(100, 100, 100); //点光源位置
scene.add(point); //点光源添加到场景中

//环境光
var ambient = new THREE.AmbientLight(0xafb4db);
scene.add(ambient);

/**
 * 相机对象
 */
var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比
var s = 150; //三维场景显示范围控制系数

var camera;
camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 100, 1000);
camera.position.set(200, 60, 200); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

/**
 * 创建渲染器对象
 */
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);//设置渲染区域尺寸
renderer.setClearColor(0xcccccc, 1); //设置背景颜色
document.body.appendChild(renderer.domElement); //html的body元素中插入canvas对象

//渲染函数
function render() {
    renderer.render(scene, camera);//执行渲染操
}

setTimeout("render()", 1000);

var controls = new THREE.OrbitControls(camera, renderer.domElement);//创建控件对象
controls.addEventListener('change', render);//监听鼠标、键盘事件

window.onkeydown = function (e) {
    let code = e.keyCode;
    switch (code) {
        case 80: //切换投影
            flagProjection = !flagProjection;
            if (flagProjection) //根据投影的flag选择正投影还是透视投影
                camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 100, 1000);
            else
                camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);

            camera.position.set(200, 60, 200); //设置相机位置
            camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

            var controls = new THREE.OrbitControls(camera, renderer.domElement);//创建控件对象
            controls.addEventListener('change', render);//监听鼠标、键盘事件

            render();

        case 65:
            meshCar.rotateZ(-0.02);
            render();
            break;

        case 68:
            meshCar.rotateZ(0.02);
            render();
            break;
    }
}