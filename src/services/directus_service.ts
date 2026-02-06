import axios from 'axios'

const token = import.meta.env.VITE_DIRECTUS_TOKEN

const baseUrl = import.meta.env.VITE_DIRECTUS_BASE_URL

const projectId = import.meta.env.VITE_DIRECTUS_PROJECT_ID

export interface CreateContactData {
  first_name: string
  last_name: string
  email: string
  phone: string
  company: string
  subject: string
  message: string
  projectId: Project
}

/** Payload for creating a contact; projectId is the relation ID (string). */
export interface CreateContactPayload {
  first_name: string
  last_name: string
  email: string
  phone: string
  company: string
  subject: string
  message: string
}

export interface Project {
  id: string
  name: string
  logo: string
  url: string
  date_created: string
  user_created: string
  date_updated: string
  user_updated: string
  start_date: string
  end_date: string
  clientId: string
  sort: string | null
  status: string | null
}



class DirectusService {
  public baseUrl = baseUrl
  private token = token

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.token}`,
    }
  }

  public async createContact(data: CreateContactPayload) {
    return await axios.post(`${this.baseUrl}/items/contacts`, { ...data, projectId }, {
      headers: this.getHeaders(),
    }).then((res) => res.data)
      .catch((err) => {
        console.log(err)
        throw err
      })
  }

  public getFileDownloadUrl(fileId: string): string {
    return `${this.baseUrl}/assets/${fileId}?access_token=${this.token}`
  }
}

export default new DirectusService()
