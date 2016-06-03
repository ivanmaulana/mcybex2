<?php
    // check HTTP Origin
	if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }

    $connection = mysqli_connect("localhost","root","pVWLrkDoYv","db_cybex2013") or die("Error " . mysqli_error($connection));

    // get JSON input from HTTP POST
    $postdata = file_get_contents("php://input");

    if ($postdata){
        // JSON Decode from input
        $request = json_decode($postdata);
				$id_artikel = $request->id_artikel;
				$isikomentar = $request->isi_komentar;

				$isikomentar2 = nl2br($isikomentar);
				$isi_komentar = '<p>'.$isikomentar2.'</p>';

        $id_kategori = 1;
        $id_topik = 1;
        $id_komoditas = 1;
        $id_user_input = 16;

				$query = mysqli_query($connection, "INSERT INTO artikel_komentar (id_user, isi_komentar, id_artikel) VALUES (16, '$isi_komentar', '$id_artikel');");

        // avoid print unless username & password is set
        if ($query){
            echo "sukses";
        }
        else {
            echo "gagal";
        }
    }
    else echo "gagal koneksi";

?>
