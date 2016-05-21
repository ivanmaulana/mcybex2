<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
    header('Access-Control-Allow-Headers: Content-Type, x-xsrf-token');


 //open connection to mysql db
    $connection = mysqli_connect("localhost","root","pVWLrkDoYv","db_cybex2013") or die("Error " . mysqli_error($connection));
    
    $id_artikel = $_GET['idartikel'];


    //fetch table rows from mysql db
    $sql = "SELECT id_artikel, id_kategori, nama_kategori, judul_artikel, tanggal, id_user_input,nama_user_input,isi_artikel FROM artikel_view where id_artikel='$id_artikel'";
    $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

    

    //create an array
    $emparray = array();
    while($row =mysqli_fetch_array($result))
    {
        $emparray[] = $row;
    }
    echo json_encode($emparray);
    //$res1 =  escapeJsonString($res);
    //echo $res;

    //close the db connection
    mysqli_close($connection);




?>
