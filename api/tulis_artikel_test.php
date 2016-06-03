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
        $judul_artikel = $request->judul_artikel;
        $isi_artikel = $request->isi_artikel;
        
        $id_kategori = 1;
        $id_topik = 1;
        $id_komoditas = 1;
        $id_user_input = 16;
        
        $query1 = mysqli_query($connection, "BEGIN;");
	$query2 = mysqli_query($connection, "INSERT INTO artikel (id_kategori, id_topik, id_komoditas, judul_artikel, isi_artikel, tanggal, is_remove) VALUES (1, 1, 1, '$judul_artikel', '$isi_artikel', NOW(), 'N');");
	$query3 = mysqli_query($connection, "INSERT INTO artikel_status (id_artikel,id_user,artikel_status) VALUES (LAST_INSERT_ID(),16,'post'); ");
	$query4 = mysqli_query($connection, "COMMIT;");
                
        // avoid print unless username & password is set
        if ($query1 &&  $query2 &&  $query3 &&  $query4){
            echo "sukses";
        }
        else {
            echo "gagal";
        }
    }
    else echo "gagal koneksi";
    
?>