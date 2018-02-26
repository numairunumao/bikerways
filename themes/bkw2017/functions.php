<?php
function my_theme_enqueue_styles() {
    wp_enqueue_style( 'bootstrap', get_stylesheet_directory_uri().'/assets/css/bootstrap.min.css');
    wp_enqueue_style( 'owl-style', get_stylesheet_directory_uri().'/assets/css/owl.carousel.min.css');
    wp_enqueue_style('styles', get_stylesheet_directory_uri() . '/assets/css/style.css');


    wp_enqueue_script( 'jquery', get_template_directory_uri() . '/assets/js/jquery-3.2.1.min.js', array(), '1.0.0', true );
    wp_enqueue_script( 'bootstrap-popper', get_template_directory_uri() . '/assets/js/popper.min.js', array(), '1.0.0', true );
    wp_enqueue_script( 'bootstrap', get_template_directory_uri() . '/assets/js/bootstrap.min.js', array(), '1.0.0', true );
    wp_enqueue_script( 'owl-js', get_template_directory_uri() . '/assets/js/owl.carousel.min.js', array(), '1.0.0', true );
    wp_enqueue_script( 'owl-js-thumb', get_template_directory_uri() . '/assets/js/owl.carousel2.thumbs.min.js', array(), '1.0.0', true );
   wp_enqueue_script( 'js-custom', get_template_directory_uri() . '/assets/js/custom.js', array(), '1.0.0', true );

}
add_action('wp_enqueue_scripts', 'my_theme_enqueue_styles');

// The excerpt
add_filter("the_excerpt", "plugin_myContentFilter");
function plugin_myContentFilter($content){
    return substr($content, 0, 300);
}

// The excerpt title
add_filter( 'the_title', 'wpse_75691_trim_words' );
function wpse_75691_trim_words( $title )
{
    // limit to ten words
    return wp_trim_words( $title, 7, '' );
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


include "shortcode/calculate.php";

?>







