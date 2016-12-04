package palkarvatho;

import java.io.IOException;
import java.util.ArrayList;
import java.util.logging.Logger;

import javax.servlet.http.*;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.appengine.labs.repackaged.org.json.JSONArray;
import com.google.appengine.labs.repackaged.org.json.JSONException;
import com.google.appengine.labs.repackaged.org.json.JSONObject;
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.PropertyProjection;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Entity;

@SuppressWarnings("serial")
public class PalkarVathoServlet extends HttpServlet {
	private static final Logger log = Logger.getLogger(PalkarVathoServlet.class
			.getName());

	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {

		doProcess(req, resp);
		// resp.setContentType("text/json");
		// resp.getWriter().println("Hello, world");
	}

	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {

		doProcess(req, resp);
	}

	public void doProcess(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		UserService userService = null;
		User user = null;
		JSONObject jsonObject = null;
		DatastoreService datastore = null;
		String action = req.getParameter("action");
		jsonObject = new JSONObject();
		try {
			if (action != null && action.equalsIgnoreCase("ceCheckAvail")) {
				userService = UserServiceFactory.getUserService();
				user = userService.getCurrentUser();

				if (user != null) {

					jsonObject.put("isUser", true);
					String eWord = req.getParameter("eWord");
					JSONArray sWordArray = new JSONArray();
					datastore = DatastoreServiceFactory.getDatastoreService();
					Filter eWordFilter = new FilterPredicate("eword",
							FilterOperator.EQUAL, eWord);
					Query q = new Query("Dictionary").setFilter(eWordFilter);
					q.addProjection(new PropertyProjection("sword",
							String.class));
					PreparedQuery pq = datastore.prepare(q);

					for (Entity result : pq.asIterable()) {
						String sWord = (String) result.getProperty("sword");
						log.info(sWord);
						sWordArray.put(sWord);
					}
					jsonObject.put("sWordArray", sWordArray);

				} else {
					jsonObject.put("isUser", false);
				}

				resp.setContentType("text/json");
				resp.getWriter().print(jsonObject.toString());
			} else if (action != null
					&& action.equalsIgnoreCase("contributeWord")) {
				userService = UserServiceFactory.getUserService();
				user = userService.getCurrentUser();

				if (user != null) {
					jsonObject.put("isUser", true);
					String eWord = req.getParameter("eWord");
					String sWord = req.getParameter("sWord");
					datastore = DatastoreServiceFactory.getDatastoreService();
					Entity entity = new Entity("Dictionary");
					entity.setProperty("eword", eWord);
					entity.setProperty("sword", sWord);
					entity.setProperty("user", user);
					datastore.put(entity);

				} else {
					jsonObject.put("isUser", false);
				}
				resp.setContentType("text/json");
				resp.getWriter().print(jsonObject.toString());

			} else if (action != null && action.equalsIgnoreCase("shTranslate")) {
				String eWord = req.getParameter("eWord");
				JSONArray sWordArray = new JSONArray();
				datastore = DatastoreServiceFactory.getDatastoreService();
				Filter eWordFilter = new FilterPredicate("eword",
						FilterOperator.EQUAL, eWord);
				Query q = new Query("Dictionary").setFilter(eWordFilter);
				q.addProjection(new PropertyProjection("sword", String.class));
				PreparedQuery pq = datastore.prepare(q);

				for (Entity result : pq.asIterable()) {
					String sWord = (String) result.getProperty("sword");
					log.info(sWord);
					sWordArray.put(sWord);
				}
				jsonObject.put("sWordArray", sWordArray);

				resp.setContentType("text/json");
				resp.getWriter().print(jsonObject.toString());

			} else if (action != null && action.equalsIgnoreCase("cnSearch")) {
				userService = UserServiceFactory.getUserService();
				user = userService.getCurrentUser();

				if (user != null) {

					jsonObject.put("isUser", true);
					String eWord = req.getParameter("eWord");
					JSONArray sWordArray = new JSONArray();
					JSONArray pIdArray = new JSONArray();
					datastore = DatastoreServiceFactory.getDatastoreService();
					Filter eWordFilter = new FilterPredicate("eword",
							FilterOperator.EQUAL, eWord);
					Query q = new Query("Dictionary").setFilter(eWordFilter);
					// q.addProjection(new PropertyProjection("sword",
					// String.class));
					PreparedQuery pq = datastore.prepare(q);

					for (Entity result : pq.asIterable()) {
						String sWord = (String) result.getProperty("sword");
						log.info(result.getKey().getId() + " : " + sWord);
						pIdArray.put(result.getKey().getId());
						sWordArray.put(sWord);
					}
					jsonObject.put("sWordArray", sWordArray);
					jsonObject.put("pIdArray", pIdArray);

				} else {
					jsonObject.put("isUser", false);
				}

				resp.setContentType("text/json");
				resp.getWriter().print(jsonObject.toString());
			} else if (action != null
					&& action.equalsIgnoreCase("saveEditSWord")) {
				userService = UserServiceFactory.getUserService();
				user = userService.getCurrentUser();

				if (user != null) {

					jsonObject.put("isUser", true);
					String pId = req.getParameter("pId");
					String newSWord = req.getParameter("newSWord");

					datastore = DatastoreServiceFactory.getDatastoreService();
					Key key = KeyFactory.createKey("Dictionary",
							Long.valueOf(pId));
					Entity entity = datastore.get(key);
					entity.setProperty("sword", newSWord);
					datastore.put(entity);

				} else {
					jsonObject.put("isUser", false);
				}

				resp.setContentType("text/json");
				resp.getWriter().print(jsonObject.toString());
			} else if (action != null
					&& action.equalsIgnoreCase("saveSWordDelete")) {
				userService = UserServiceFactory.getUserService();
				user = userService.getCurrentUser();

				if (user != null) {

					jsonObject.put("isUser", true);
					String pId = req.getParameter("pId");
					datastore = DatastoreServiceFactory.getDatastoreService();
					Key key = KeyFactory.createKey("Dictionary",
							Long.valueOf(pId));
					datastore.delete(key);

				} else {
					jsonObject.put("isUser", false);
				}

				resp.setContentType("text/json");
				resp.getWriter().print(jsonObject.toString());
			} else if (action != null
					&& action.equalsIgnoreCase("saveEditEWord")) {
				userService = UserServiceFactory.getUserService();
				user = userService.getCurrentUser();

				if (user != null) {

					jsonObject.put("isUser", true);
					String pId = req.getParameter("pId");
					String[] pIDArray=pId.split(",");
					String newEWord = req.getParameter("newEWord");
					ArrayList<Entity> entityList = new ArrayList<Entity>();
					Entity entity = null;
					datastore = DatastoreServiceFactory.getDatastoreService();
					for (String sPID : pIDArray) {
						Key key = KeyFactory.createKey("Dictionary",
								Long.valueOf(sPID));
						entity = datastore.get(key);
						entity.setProperty("eword", newEWord);
						entityList.add(entity);
					}
					datastore.put(entityList);

				} else {
					jsonObject.put("isUser", false);
				}

				resp.setContentType("text/json");
				resp.getWriter().print(jsonObject.toString());
			}else if (action != null
					&& action.equalsIgnoreCase("saveEWordDelete")) {
				userService = UserServiceFactory.getUserService();
				user = userService.getCurrentUser();

				if (user != null) {

					jsonObject.put("isUser", true);
					String pId = req.getParameter("pId");
					String[] pIdArray=pId.split(",");
					ArrayList<Key> keyList=new ArrayList<Key>();
					Key key = null;
					for(String sPId:pIdArray){
					datastore = DatastoreServiceFactory.getDatastoreService();
					 key = KeyFactory.createKey("Dictionary",
							Long.valueOf(sPId));
					keyList.add(key);
					}
					datastore.delete(keyList);

				} else {
					jsonObject.put("isUser", false);
				}

				resp.setContentType("text/json");
				resp.getWriter().print(jsonObject.toString());
			}

		} catch (JSONException e) {
			// TODO: handle exception
			e.printStackTrace();
		} catch (EntityNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
}
