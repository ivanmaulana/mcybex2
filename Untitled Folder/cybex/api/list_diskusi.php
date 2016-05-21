<?php
    header('Access-Control-Allow-Origin: *');



 //open connection to mysql db
    $connection = mysqli_connect("localhost","root","pVWLrkDoYv","db_cybex2013") or die("Error " . mysqli_error($connection));

    //fetch table rows from mysql db
    //$sql = "SELECT artikel.id_artikel,id_kategori,id_topik,id_komoditas,judul_artikel,tanggal, id_gambar, path from artikel inner join tabel_gambar where artikel.id_artikel=tabel_gambar.id_artikel and id_kategori=2 order by artikel.id_artikel desc limit 4";
    
    $sql = "SELECT id_artikel, id_kategori, id_topik, id_komoditas, judul_artikel, tanggal,nama_user_input FROM artikel_view WHERE id_kategori=2 AND is_remove='N' ORDER BY id_artikel DESC";


    $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

    //create an array
    $emparray = array();
    while($row =mysqli_fetch_assoc($result))
    {
        $emparray[] = $row;
    }
    echo json_encode($emparray);

    //close the db connection
    mysqli_close($connection);




?>
