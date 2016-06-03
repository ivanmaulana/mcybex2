<?php
    header('Access-Control-Allow-Origin: *');



    //open connection to mysql db
    $connection = mysqli_connect("localhost","root","pVWLrkDoYv","db_cybex2013") or die("Error " . mysqli_error($connection));

    //get current time via SQL
    $query_waktu = mysqli_query($connection, "SELECT NOW() AS now");
    $waktu=mysqli_fetch_assoc($query_waktu);


    //fetch table rows from mysql db
    //$sql = "SELECT artikel.id_artikel,id_kategori,id_topik,id_komoditas,judul_artikel,tanggal, id_gambar, path from artikel inner join tabel_gambar where artikel.id_artikel=tabel_gambar.id_artikel and id_kategori=2 order by artikel.id_artikel desc limit 4";

    $sql = "SELECT id_artikel, id_kategori, id_topik, id_komoditas, judul_artikel, isi_artikel, tanggal, nama_user_input, total_baca, total_komentar FROM artikel_view WHERE id_kategori=2 AND is_remove='N' ORDER BY id_artikel DESC LIMIT 5";

    $result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

    //create an array
    $emparray = array();
    while($row =mysqli_fetch_assoc($result))
    {
	//Send the time difference instead of the date
	$seconds  = strtotime($waktu['now']) - strtotime($row['tanggal']);
        $years = floor($seconds / (3600*24*30*12));
        $months = floor($seconds / (3600*24*30));
        $day = floor($seconds / (3600*24));
        $hours = floor($seconds / 3600);
        $mins = floor(($seconds - ($hours*3600)) / 60);
        $secs = floor($seconds % 60);

        if($seconds < 60)
            $time = $secs." detik yang lalu";
        else if($seconds < 60*60 )
            $time = $mins." menit yang lalu";
        else if($seconds < 24*60*60)
            $time = $hours." jam yang lalu";
        else if($seconds < 30*24*60*60)
            $time = $day." hari yang lalu";
        else if ($seconds < 12*30*24*60*60)
            $time = $months." bulan yang lalu";
        else
            $time = $years."tahun yang lalu";

        $row['tanggal'] = $time;

        $emparray[] = $row;
    }
    echo json_encode($emparray);

    //close the db connection
    mysqli_close($connection);




?>
