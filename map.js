
// 現在地取得処理
function initMap() {
    // Geolocation APIに対応している
    if (navigator.geolocation) {
        // 現在地を取得
        navigator.geolocation.getCurrentPosition(
            // 取得成功した場合
            function (position) {
                // 緯度・経度を変数に格納
                var mapLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                // マップオプションを変数に格納
                if (searchAdress["None"] == 0) {
                    var mapOptions = {
                        zoom: 15,          // 拡大倍率
                        center: mapLatLng,  // 緯度・経度
                        styles : style
                    };
                } else {
                    var mapOptions = {
                        zoom: 15,          // 拡大倍率
                        center: new google.maps.LatLng(searchAdress["lat"], searchAdress["lng"]),  // 緯度・経度
                        styles: style
                    };
                }
                // マップオブジェクト作成
                var map = new google.maps.Map(
                    document.getElementById("map"), // マップを表示する要素
                    mapOptions         // マップオプション
                );
                //マップにマーカーを表示する
                var currentmarker = new google.maps.Marker({
                    map: map,             // 対象の地図オブジェクト
                    position: mapLatLng,   // 緯度・経度
                    icon: {
                        fillColor: "#1E90FF",                //塗り潰し色
                        fillOpacity: 10,                    //塗り潰し透過率
                        path: google.maps.SymbolPath.CIRCLE, //円を指定
                        scale: 12,                           //円のサイズ
                        strokeColor: "#FFFFFF",              //枠の色
                        strokeWeight: 3.0                    //枠の透過率
                    }
                });
                // 現在表示されているinfoWindowオブジェクト
                let currentWindow;


            },
            // 取得失敗した場合
            function (error) {
                // エラーメッセージを表示
                switch (error.code) {
                    case 1: // PERMISSION_DENIED
                        alert("位置情報の利用が許可されていません");
                        break;
                    case 2: // POSITION_UNAVAILABLE
                        alert("現在位置が取得できませんでした");
                        break;
                    case 3: // TIMEOUT
                        alert("タイムアウトになりました");
                        break;
                    default:
                        alert("その他のエラー(エラーコード:" + error.code + ")");
                        break;
                }
            }
        );
        // Geolocation APIに対応していない
    } else {
        alert("この端末では位置情報が取得できません");
    }
}
