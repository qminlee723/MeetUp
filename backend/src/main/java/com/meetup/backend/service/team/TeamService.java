package com.meetup.backend.service.team;

import org.json.JSONArray;

/**
 * created by myeongseok on 2022/10/21
 * updated by seungyong on 2022/10/27
 */
public interface TeamService {

    JSONArray registerTeamFromMattermost(String userId, String mmSessionToken);

}
