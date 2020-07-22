import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Blog from '../components/Blog';
import LoadingBox from '../components/LoadingBox';
import ErrorBox from '../components/ErrorBox';
import { listBlogs, listBlogCategories } from '../actions/blogActions';
import { listArticles } from '../actions/articleActions';
import Article from '../components/Article';

function HomeScreen(props) {

  const dispatch = useDispatch();
  const articleList = useSelector((state) => state.articleList);
  useEffect(() => {
    dispatch(listArticles());
    return () => {
      //
    };
  }, []);
  const category = props.match.params.id ? props.match.params.id : '';
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const blogList = useSelector(state => state.blogList);
  useEffect(() => {
    dispatch(listBlogs(category, searchKeyword, sortOrder));
  
    return () => {
      //
    };
  }, [dispatch, category]);
  
  const { loading, blogs, error } = blogList;

  const { loading:loadingArticles, articles, error: errorArticle } = articleList;



  return (
    <div className="edina_tm_wrapper_all">
      <div id="edina_tm_popup_blog">
        <div className="container">
          <div className="inner_popup scrollable"></div>
        </div>
        <span className="close">
          <a href="#"></a>
        </span>
      </div>

      <header className="edina_tm_header">
        <div className="edina_tm_navigation_wrap">
          <div className="container">
            <div className="navigation_inner">
              <div className="logo">
                {/* <a className="dark_logo" href="#"><img src="img/logo/logo1.png" alt="" /></a> */}
              </div>
              <div className="nav_list_wrap">
                <div className="menu">
                  <ul className="anchor_nav">
                    <li>
                      <a href="#home">Home</a>
                    </li>
                    <li>
                      <a href="#donate">Donate</a>
                    </li>
                    <li>
                      <a href="#services">Ways to Donate</a>
                    </li>
                    <li>
                      <a href="#portfolio">Media</a>
                    </li>

                    <li>
                      <a href="#contact">Contact</a>
                    </li>
                  </ul>
                </div>
                <div className="social_icons_wrap">
                  <ul>
                    <li>
                      <a href="https://www.facebook.com/wcmaple">
                        <i className="xcon-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/wcmaple/">
                        <i className="xcon-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="edina_tm_trigger">
                <div className="hamburger hamburger--collapse-r">
                  <div className="hamburger-box">
                    <div className="hamburger-inner"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="edina_tm_mobile_menu_wrap">
          <div className="mob_menu">
            <ul className="anchor_nav">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#donate">Donate</a>
              </li>
              <li>
                <a href="#services">Ways to Donate</a>
              </li>
              <li>
                <a href="#portfolio">Media</a>
              </li>

              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <div className="edina_tm_content">
        <div className="edina_tm_section" id="home">
          <div className="edina_tm_hero_header">
            <div className="edina_tm_universal_box_wrap">
              <div className="bg_wrap">
                <div
                  className="overlay_image hero jarallax"
                  data-speed="0"
                ></div>
                <div className="overlay_video"></div>
                <div className="overlay_color hero"></div>
              </div>
              <div className="content hero">
                <div className="container hero">
                  <div className="hero_title">
                    <p className="first">
                      I'm Wiley Maple
                      <br />
                      <span className="edina_tm_animation_text_word"></span>
                    </p>
                  </div>
                </div>
                <div className="edina_tm_discover_wrap anchor">
                  <span>
                    <a href="#about">Discover</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="edina_tm_section" id="donate">
          <div className="container">
            <div className="edina_tm_main_title_holder_wrap about">
              <div className="number_wrap">
                <span>01</span>
              </div>
              <div className="title_wrap">
                <span>Donate</span>
              </div>
            </div>
            <div className="video-conainer-sm">
              <iframe
                src="https://player.vimeo.com/video/300112867?autoplay=1&loop=1"
                width="640"
                height="200"
                frameborder="0"
              ></iframe>
            </div>
            <div className="edina_tm_about_wrap homepage_second">
              <div className="author_wrap">
                <div className="leftbox">
                  <div className="video-conainer">
                    <iframe
                      src="https://player.vimeo.com/video/300112867?autoplay=1&loop=1"
                      width="640"
                      height="360"
                      frameborder="0"
                      webkitallowfullscreen
                      mozallowfullscreen
                      allowfullscreen
                    ></iframe>
                  </div>
                </div>
                <div className="rightbox">
                  <div className="name_holder">
                    <h3>I'm Wiley Maple</h3>
                  </div>
                  <div className="definition">
                    <p>Thank you for your support of my skiing career!</p>
                    <p>
                      Forced to miss the 2016/2017 ski season to recover from
                      knee and back surgery, I channeled energy into school and
                      recovery and maintained a 3.9 GPA at Westminster College
                      in Salt Lake City. The USST again failed to rename me
                      after an injury season in May 2017. But as my health
                      returned over that 1.5 years off snow, I realized I was
                      not done with World Cup skiing. Although not being named
                      to the USST would make a comeback difficult and costly,
                      training opportunities were luckily still extended to me
                      through Johno McBride and the World Cup Speed Team. I
                      regained my health through the summer of 2017 working half
                      days painting walls, coaching mountain biking for the
                      Aspen Valley Ski & Snowboard Club and delivering ribs. In
                      my spare time, I put countless hours into waxing and
                      preparing my skis. After an anticipated slow start to the
                      year, I started breaking through the ranks of the World
                      Cup, scoring points on two of the world’s toughest tracks
                      - Bormio, Italy and Kitzbuhel, Austria. These results
                      earned me a spot on my first Olympic team.{' '}
                    </p>
                    <p>
                      In PyeongChang, I was the first Aspen athlete to compete
                      in an Olympic Downhill since Andy Mill in 1980. Despite a
                      successful comeback after 1 ½ years off snow, I was again
                      left off the National Team for reasons unknown to my
                      teammates and direct coaching staff – once again leaving
                      me to continue this season’s fight from no-mans land. This
                      season I am healthy, strong and determined to do
                      everything in my power to further push through the ranks
                      of the World Cup. Having suffered injuries in the gym over
                      the last 10 years, I opted to reimagine my training
                      routine - coaching mountain biking two days a week,
                      hopping back in the saddle another 3, interval training at
                      pick up hockey and working with my PT Glen McCloud 4 days
                      a week to maintain my strength without compromising my
                      body. I enjoyed a high quality on snow training camp in
                      New Zealand.
                    </p>
                    <p>
                      This season, Atomic and Swix have stepped up their level
                      of support and I have convinced my oldest friend and 2
                      time NCAA All American skier Sam Coffey to join me on the
                      World Cup providing ski service. The final piece of the
                      puzzle comes from you. The season is projected to cost me
                      $70,000. Sponsorships and grants will cover about 20% of
                      this cost, leaving a shortfall of over $55,000. In order
                      to help fund my season’s travel, training and
                      accommodation expense, I am once again asking the
                      community to help me.
                    </p>
                    <p>
                      I have come too far, suffered long and developed too much
                      skill in this sport to quit now! Please help me finally
                      step up onto the podium this season!
                    </p>
                    {/* <p>
										Please help me compete on the World Cup circuit and for a spot on the Olympic team. Contributions can be made
										via </p>
									<a className="money-links" href="https://worldcupdreams.org/blogs/current-fundraisers/wiley-maple" target="_blank">World
										Cup Dreams</a>
									<p>
										You can also send checks directly to me if you prefer... address and links to follow</p>
									<a className="money-links" href="https://venmo.com/" target="_blank">Venmo <br> @wiley-maple</a>
									<a className="money-links" href="https://www.paypal.me/WileyMaple" target="_blank">PayPal <br>
										wcmaple@comcast.net</a>
									<p>
										Thank you for all the support and enthusiasm you have shown me and my career over the years. It’s an honor to
										continue to chase these World Cup and Olympic dreams with your support!
										Sincerely,
										Wiley Maple
									</p>
									<p>
										1250 Mountain View Drive
									</p>
									<p>
										Aspen, CO 81611 </p> */}
                  </div>
                  <div className="sharebox">
                    <ul>
                      <li className="wow fadeIn" data-wow-duration="1.2s">
                        <span>Share:</span>
                      </li>
                      <li
                        className="wow fadeIn"
                        data-wow-duration="1.2s"
                        data-wow-delay="0.2s"
                      >
                        <a href="https://www.facebook.com/wcmaple">
                          <i className="xcon-facebook"></i>
                        </a>
                      </li>
                      <li
                        className="wow fadeIn"
                        data-wow-duration="1.2s"
                        data-wow-delay="0.8s"
                      >
                        <a href="https://www.instagram.com/wcmaple/">
                          <i className="xcon-instagram"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="edina_tm_section" id="services">
          <div className="edina_tm_services_total_wrap">
            <div className="container">
              <div className="edina_tm_main_title_holder_wrap">
                <div className="number_wrap">
                  <span>02</span>
                </div>
                <div className="title_wrap">
                  <span>Ways To Donate</span>
                </div>
              </div>
              <div className="edina_tm_services_wrap">
                <div
                  className="edina_tm_list_wrap"
                  data-column="5"
                  data-space="70"
                >
                  <ul className="total">
                    <li className="wow fadeIn" data-wow-duration="1.2s">
                      <a href="https://www.teamavsc.org/give">
                        <div className="inner_list">
                          <div className="service_icon">
                            <img
                              className="svg"
                              src="https://www.teamavsc.org/images/aspen-valley-ski-snowboard-club.png"
                              alt=""
                            />
                          </div>
                          <div className="service_title">
                            <h3>AVSC </h3>
                          </div>
                          <div className="service_definition">
                            <p>
                            Sam Coffey Memorial Scholarship.
                            </p>
                          </div>
                          <span className="first"></span>
                          <span className="second"></span>
                        </div>
                      </a>
                    </li>
{/* 
                    <li
                      className="wow fadeIn"
                      data-wow-duration="1.2s"
                      data-wow-delay="0.4s"
                    >
                      <a href="https://venmo.com/Wiley-Maple">
                        <div className="inner_list">
                          <div className="service_icon">
                            <img
                              className="svg"
                              src="https://www.nextadvisor.com/blog/wp-content/uploads/2016/01/venmologo-300x300.png"
                              alt=""
                            />
                          </div>
                          <div className="service_title">
                            <h3>Venmo</h3>
                          </div>
                          <div className="service_definition">
                            <p>You can Venmo me directly @wiley-maple</p>
                          </div>
                          <span className="first"></span>
                          <span className="second"></span>
                        </div>
                      </a>
                    </li>
                    <li
                      className="wow fadeIn"
                      data-wow-duration="1.2s"
                      data-wow-delay="0.6s"
                    >
                      <div className="inner_list">
                        <div className="service_icon">
                          <img
                            className="svg"
                            src="https://banner2.kisspng.com/20180501/byw/kisspng-post-box-mail-stock-photography-post-office-box-mailbox-5ae84bd5617d17.0306210615251732053993.jpg"
                            alt=""
                          />
                        </div>
                        <div className="service_title">
                          <h3>Snail Mail </h3>
                        </div>
                        <div className="service_definition">
                          <p>You can also send checks directly to me at</p>
                          <p>1250 Mountain View Drive Aspen, CO 81611</p>
                        </div>
                        <span className="first"></span>
                        <span className="second"></span>
                      </div>
                    </li>
                    <li
                      className="wow fadeIn"
                      data-wow-duration="1.2s"
                      data-wow-delay="0.8s"
                    >
                      <a href="https://www.paypal.me/WileyMaple">
                        <div className="inner_list">
                          <div className="service_icon">
                            <img
                              className="svg"
                              src="https://www.imore.com/sites/imore.com/files/topic_images/2016/paypal-topic.png"
                              alt=""
                            />
                          </div>
                          <div className="service_title">
                            <h3>PayPal</h3>
                          </div>
                          <div className="service_definition">
                            <p>You can PayPal me</p>
                          </div>
                          <span className="first"></span>
                          <span className="second"></span>
                        </div>
                      </a>
                    </li>

                    <li
                      className="wow fadeIn"
                      data-wow-duration="1.2s"
                      data-wow-delay="0.8s"
                    >
                      <a href="https://www.paypal.com/cgi-bin/webscr">
                        <div className="inner_list">
                          <div className="service_icon">
                            <img
                              className="svg"
                              src="https://blogion-uploads-rallyme.s3.amazonaws.com/uploads/organization/photo/19/standard_logo.png"
                              alt=""
                            />
                          </div>
                          <div className="service_title">
                            <h3>World Cup Dreams</h3>
                          </div>
                          <div className="service_definition">
                            <p>
                              I'm excited to announce that I've been chosen to
                              participate in a support program through the World
                              Cup Dreams Foundation{' '}
                            </p>
                          </div>
                          <span className="first"></span>
                          <span className="second"></span>
                        </div>
                      </a>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="edina_tm_section" id="portfolio">
          <div className="container">
            <div className="edina_tm_portfolio_wrap">
              <div className="edina_tm_main_title_holder_wrap portfolio">
                <div className="number_wrap">
                  <span>03</span>
                </div>
                <div className="title_wrap">
                  <span>Media</span>
                </div>
              </div>
              <ul className="edina_tm_portfolio_filter">
                <li>
                  <a href="/" className="current" data-filter="*">
                    All
                  </a>
                </li>
                {/* {loading ? (
                  <li>
                    <LoadingBox />
                  </li>
                ) : error ? (
                  <li>
                    <ErrorBox message={error} />
                  </li>
                ) : categories.length === 0 ? (
                  <li className="empty-list">There is no categories.</li>
                ) : (
                  categories.map(x => (
                    <li key={x}>
                      <Link to={`/category/${x}`}>{x}</Link>
                    </li>
                  ))
                )} */}
                <li>
                  <a href="#" data-filter=".blog">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" data-filter=".photos">
                    Photos
                  </a>
                </li>
                <li>
                  <a href="#" data-filter=".article">
                    Articles
                  </a>
                </li>
              </ul>
              <ul className="edina_tm_portfolio_list gallery_zoom">
              {loading ? (
                <LoadingBox />
              ) : error ? (
                <ErrorBox message={error} />
              ) : blogs.length === 0 ? (
                <div className="empty-list">There is no blogs.</div>
              ) : (<>
                  {blogs.map(blog => (
                    <Blog key={blog._id} {...blog} />
                  ))}
                </>
              )}
              {loadingArticles ? (
                <LoadingBox />
              ) : errorArticle ? (
                 <ErrorBox message={errorArticle} />
              ) : articleList.length === 0 ? (
                <p>there are no articles</p>
              ) : (<>
                  {articles.map((article) => (
                    <Article key={article._id} {...article} />
                  ))} 
                </>
              )}
              </ul>

            </div>
      
          </div>
        </div>

        <div className="edina_tm_section" id="contact">
          <div className="edina_tm_main_title_holder_wrap contact">
            <div className="number_wrap">
              <span>06</span>
            </div>
            <div className="title_wrap">
              <span>Contact Me</span>
            </div>
          </div>
          <div className="edina_tm_contact_wrap">
            <div className="short_info">
              <div className="container">
                <div className="subtitle">
                  <p className="wow fadeIn" data-wow-duration="1.2s">
                    Any question? Reach out to me and I will get back to you
                    shortly.
                  </p>
                </div>
              </div>
            </div>
            <div className="main_input_wrap">
              <form
                action="./modal/contact.php"
                method="post"
                className="contact_form"
                id="contact_form"
              >
                <div
                  className="returnmessage"
                  data-success="Your message has been received, We will contact you soon."
                ></div>
                <div className="empty_notice">
                  <span>Please Fill Required Fields</span>
                </div>
                <div
                  className="wrap wow fadeIn"
                  data-wow-duration="1.2s"
                  data-wow-delay="0.2s"
                >
                  <input id="name" type="text" placeholder="Your Name" />
                </div>
                <div
                  className="wrap wow fadeIn"
                  data-wow-duration="1.2s"
                  data-wow-delay="0.4s"
                >
                  <input id="email" type="text" placeholder="Your Email" />
                </div>
                <div
                  className="wrap wow fadeIn"
                  data-wow-duration="1.2s"
                  data-wow-delay="0.6s"
                >
                  <textarea id="message" placeholder="Your Message"></textarea>
                </div>
                <div
                  className="edina_tm_button wow fadeIn"
                  data-wow-duration="1.2s"
                  data-wow-delay="0.8s"
                >
                  <a id="send_message" href="#">
                    Send Message
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="edina_tm_to_top_wrap">
        <a href="#">Back To Top</a>
      </div>
      {/* end div */}
    </div>
  );
}
export default HomeScreen;
