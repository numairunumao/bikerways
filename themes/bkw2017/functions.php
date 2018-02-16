<?php
function my_theme_enqueue_styles() {
    wp_enqueue_style( 'bootstrap', get_stylesheet_directory_uri().'/assets/css/bootstrap.min.css');
    wp_enqueue_style('styles', get_stylesheet_directory_uri() . '/assets/css/style.css', array(), '1.1', "all");

    wp_enqueue_script( 'jquery', get_template_directory_uri() . '/assets/js/jquery-3.2.1.min.js', array ( 'jquery' ), 1.2, true);
    wp_enqueue_script( 'bootstrap', get_template_directory_uri() . '/assets/js/popper.min.js', array ( 'jquery' ), 1.2, true);
    wp_enqueue_script( 'bootstrap', get_template_directory_uri() . '/assets/js/bootstrap.min.js', array ( 'jquery' ), 1.2, true);
    wp_enqueue_script( 'script', get_template_directory_uri() . '/assets/js/custom.js', array ( 'jquery' ), 1.3, true);

}
add_action('wp_enqueue_scripts', 'my_theme_enqueue_styles');

// The excerpt
add_filter("the_excerpt", "plugin_myContentFilter");
function plugin_myContentFilter($content){
    return substr($content, 0, 300);
}

function techxspecs_setup() {
    load_theme_textdomain( 'techxspecs' );
    add_editor_style();

    //menu register
    register_nav_menu( 'primary', __( 'Primary Menu', 'techxspecs' ) );
    register_nav_menu( 'secondary', __( 'Secondary Menu', 'techxspecs' ) );
}

add_action( 'after_setup_theme', 'techxspecs_setup' );
add_theme_support( 'post-thumbnails' );

//General setting ACF
if( function_exists('acf_add_options_page') ) {

    acf_add_options_page(array(
        'page_title'    => 'General Settings',
        'menu_title'    => 'General Settings',
        'menu_slug'     => 'general-settings',
        'capability'    => 'edit_posts',
        'redirect'      => false
    ));
}

// Custom post type 
add_action( 'init', 'create_post_type' );

function create_post_type() {
    remove_post_type_support( 'post', 'post-formats' );

    register_post_type(
        'news',
        array(
            'labels' => array(
                'name'          => __( 'News' ),
                'singular_name' => __( 'New' ),
                'menu_name'     => __( 'ข่าวสาร' )
            ),
            'public'                => true,
            'rewrite'               => array( 'slug' => 'news' ),
            'supports'              => array( 'title', 'editor', 'page-attributes', 'thumbnail' ),
            'menu_position'         => 30,
            'exclude_from_search'   => true
        )
    );

    register_post_type(
        'travels',
        array(
            'labels' => array(
                'name'          => __( 'Travel' ),
                'singular_name' => __( 'Travel' ),
                'menu_name'     => __( 'ท่องเที่ยว' )
            ),
            'public'                => true,
            'rewrite'               => array( 'slug' => 'travel' ),
            'supports'              => array( 'title', 'editor', 'page-attributes', 'thumbnail' ),
            'menu_position'         => 30,
            'exclude_from_search'   => true
        )
    );
}

?>







