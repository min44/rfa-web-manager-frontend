import { observable, action } from "mobx";
import apiClient from "./apiClient";
import { ISession, ISessionDto } from "../react-app-env";

const sessionDtoToSession = (dto: ISessionDto): ISession => {
  return {
    id: dto.id,
    createdAt: new Date(dto.created_at),
    expiresAt: new Date(dto.expires_at),
    revokedAt: new Date(dto.revoked_at),
    lastActivityAt: new Date(dto.last_activity_at),
    ip: dto.ip,
    useragent: dto.useragent,
  };
};

export class SessionsStore {
  @observable sessions = {
    inProgress: false,
    error: null,
    sessions: [] as ISession[],
  };

  @observable revokeSessionValues = {
    inProgress: false,
    error: null,
  };

  @action setSessions(sessions: ISession[]) {
    this.sessions.sessions = sessions;
  }

  @action async getSessions(): Promise<ISession[] | null> {
    this.sessions.inProgress = true;
    try {
      const response = await apiClient.get("/auth/sessions/");
      const dtoSessions: ISessionDto[] = response.data.sessions;
      const sessions = dtoSessions.map(sessionDtoToSession);
      this.setSessions(sessions);
      return sessions;
    } catch (err) {
      this.sessions.error = err;
      return null;
    } finally {
      this.sessions.inProgress = false;
    }
  }

  @action async revokeSession(sessionId: string): Promise<boolean> {
    this.revokeSessionValues.inProgress = true;
    try {
      const response = await apiClient.delete(`/auth/sessions/${sessionId}/`);
      return response.status === 200;
    } catch (err) {
      this.revokeSessionValues.error = err;
      return false;
    } finally {
      this.revokeSessionValues.inProgress = false;
    }
  }
}

export default new SessionsStore();
